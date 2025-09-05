'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './ConstructorInterface.module.css';

const House3DViewer = dynamic(() => import('../House3DViewer/House3DViewer'), {
  ssr: false,
  loading: () => (
    <div className={styles.loading3D}>
      Загрузка 3D модели...
    </div>
  )
});

export default function ConstructorInterface({ initialData, onBack }) {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedTool, setSelectedTool] = useState('select');
  const [view3D, setView3D] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [walls, setWalls] = useState([]);
  const [doors, setDoors] = useState([]);
  const [windows, setWindows] = useState([]);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [houseFixed, setHouseFixed] = useState(true);
  const [isDraggingHouse, setIsDraggingHouse] = useState(false);
  const [houseDragStart, setHouseDragStart] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isDrawingWall, setIsDrawingWall] = useState(false);
  const [wallStart, setWallStart] = useState(null);
  const [currentWall, setCurrentWall] = useState(null);
  const [isDraggingWall, setIsDraggingWall] = useState(false);
  const [wallDragStart, setWallDragStart] = useState({ x: 0, y: 0 });

  const SCALE = 30;

  const isPointInsideHouse = (x, y) => {
    return elements.some(el => 
      el.type === 'house' &&
      x >= el.x && x <= el.x + el.width &&
      y >= el.y && y <= el.y + el.height
    );
  };

  const snapToHouseBounds = (x, y) => {
    const snapDistance = 5;
    let snappedX = x;
    let snappedY = y;
    
    elements.forEach(el => {
      if (el.type === 'house') {
        // Привязка к границам дома
        if (Math.abs(x - el.x) < snapDistance) snappedX = el.x;
        if (Math.abs(x - (el.x + el.width)) < snapDistance) snappedX = el.x + el.width;
        if (Math.abs(y - el.y) < snapDistance) snappedY = el.y;
        if (Math.abs(y - (el.y + el.height)) < snapDistance) snappedY = el.y + el.height;
      }
    });
    
    return { x: snappedX, y: snappedY };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const resizeCanvas = () => {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        drawCanvas();
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(drawCanvas, 10);
    return () => clearTimeout(timer);
  }, [zoom, panOffset, initialData, selectedElement, elements, walls, doors, windows, currentWall]);
  
  useEffect(() => {
    if (initialData) {
      const lotCenterX = 100 + (initialData.lotSize.width * 30) / 2;
      const lotCenterY = 100 + (initialData.lotSize.height * 30) / 2;
      const houseWidth = initialData.house.width * 30;
      const houseHeight = initialData.house.height * 30;
      
      const houseElement = {
        id: 'house',
        type: 'house',
        x: lotCenterX - houseWidth / 2,
        y: lotCenterY - houseHeight / 2,
        width: houseWidth,
        height: houseHeight,
        realWidth: initialData.house.width,
        realHeight: initialData.house.height
      };
      
      setElements([houseElement]);
    }
  }, [initialData]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    
    drawGrid(ctx);
    drawLot(ctx);
    drawElements(ctx);
    drawWalls(ctx);
    drawCurrentWall(ctx);
    
    ctx.restore();
  };

  const drawGrid = (ctx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let gridSize = 20 * zoom;
    
    while (gridSize < 8) gridSize *= 2;
    while (gridSize > 80) gridSize /= 2;
    
    if (gridSize < 5) return;
    
    const margin = Math.max(canvas.width, canvas.height) * 2;
    const worldLeft = -panOffset.x - margin;
    const worldTop = -panOffset.y - margin;
    const worldRight = -panOffset.x + canvas.width + margin;
    const worldBottom = -panOffset.y + canvas.height + margin;
    
    const startX = Math.floor(worldLeft / gridSize) * gridSize;
    const startY = Math.floor(worldTop / gridSize) * gridSize;
    const endX = Math.ceil(worldRight / gridSize) * gridSize + gridSize;
    const endY = Math.ceil(worldBottom / gridSize) * gridSize + gridSize;
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 0.5;
    
    for (let x = startX; x <= endX; x += gridSize) {
      const screenX = x + panOffset.x;
      ctx.beginPath();
      ctx.moveTo(screenX, -margin);
      ctx.lineTo(screenX, canvas.height + margin);
      ctx.stroke();
    }
    
    for (let y = startY; y <= endY; y += gridSize) {
      const screenY = y + panOffset.y;
      ctx.beginPath();
      ctx.moveTo(-margin, screenY);
      ctx.lineTo(canvas.width + margin, screenY);
      ctx.stroke();
    }
  };

  const drawLot = (ctx) => {
    const houseElement = elements.find(el => el.type === 'house');
    if (!houseElement) return;
    
    const lotX = 100 * zoom;
    const lotY = 100 * zoom;
    const lotW = initialData.lotSize.width * 30 * zoom;
    const lotH = initialData.lotSize.height * 30 * zoom;
    
    ctx.fillStyle = 'rgba(200, 200, 200, 0.05)';
    ctx.fillRect(lotX, lotY, lotW, lotH);
    
    ctx.strokeStyle = '#2196f3';
    ctx.lineWidth = Math.max(2, 3 * zoom);
    const dashSize = Math.max(8, 15 * zoom);
    ctx.setLineDash([dashSize, dashSize * 0.6]);
    ctx.strokeRect(lotX, lotY, lotW, lotH);
    ctx.setLineDash([]);
    
    if (zoom >= 0.3) {
      ctx.fillStyle = '#666';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      
      ctx.fillText(
        `${(initialData.lotSize.width * 1000).toFixed(0)}мм`,
        lotX + lotW / 2,
        lotY - 10 * zoom
      );
      
      ctx.save();
      ctx.translate(lotX - 20 * zoom, lotY + lotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(`${(initialData.lotSize.height * 1000).toFixed(0)}мм`, 0, 0);
      ctx.restore();
      
      // Количество соток под участком
      ctx.fillText(
        `${((initialData.lotSize.width * initialData.lotSize.height) / 100).toFixed(2)} соток`,
        lotX + lotW / 2,
        lotY + lotH + 25 * zoom
      );
    }
  };

  const drawElements = (ctx) => {
    elements.forEach(element => {
      drawElement(ctx, element);
    });
  };

  const drawWalls = (ctx) => {
    walls.forEach(wall => {
      const isHovered = hoveredElement?.id === wall.id;
      const isSelected = selectedElement?.id === wall.id;
      ctx.strokeStyle = (isSelected || isHovered) ? '#df682b' : '#31323d';
      ctx.lineWidth = (isSelected || isHovered) ? Math.max(4, 5 * zoom) : Math.max(3, 4 * zoom);
      ctx.beginPath();
      ctx.moveTo(wall.start.x * zoom, wall.start.y * zoom);
      ctx.lineTo(wall.end.x * zoom, wall.end.y * zoom);
      ctx.stroke();
      
      // Размер стены
      if (zoom >= 0.3) {
        const length = Math.sqrt(
          Math.pow(wall.end.x - wall.start.x, 2) + 
          Math.pow(wall.end.y - wall.start.y, 2)
        );
        const centerX = (wall.start.x + wall.end.x) / 2 * zoom;
        const centerY = (wall.start.y + wall.end.y) / 2 * zoom;
        
        ctx.fillStyle = '#31323d';
        ctx.font = '11px Arial';
        
        if (Math.abs(wall.end.x - wall.start.x) > Math.abs(wall.end.y - wall.start.y)) {
          // Горизонтальная стена - размер сверху по центру
          ctx.textAlign = 'center';
          ctx.fillText(`${(length * 1000 / 30).toFixed(0)}мм`, centerX, centerY - 10 * zoom);
        } else {
          // Вертикальная стена - размер слева по центру
          ctx.save();
          ctx.translate(centerX - 15 * zoom, centerY);
          ctx.rotate(-Math.PI / 2);
          ctx.textAlign = 'center';
          ctx.fillText(`${(length * 1000 / 30).toFixed(0)}мм`, 0, 0);
          ctx.restore();
        }
      }
    });
  };

  const drawCurrentWall = (ctx) => {
    if (currentWall) {
      ctx.strokeStyle = '#df682b';
      ctx.lineWidth = Math.max(3, 4 * zoom);
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(currentWall.start.x * zoom, currentWall.start.y * zoom);
      ctx.lineTo(currentWall.end.x * zoom, currentWall.end.y * zoom);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Размер текущей стены
      if (zoom >= 0.3) {
        const length = Math.sqrt(
          Math.pow(currentWall.end.x - currentWall.start.x, 2) + 
          Math.pow(currentWall.end.y - currentWall.start.y, 2)
        );
        const centerX = (currentWall.start.x + currentWall.end.x) / 2 * zoom;
        const centerY = (currentWall.start.y + currentWall.end.y) / 2 * zoom;
        
        ctx.fillStyle = '#df682b';
        ctx.font = '12px Arial';
        
        if (Math.abs(currentWall.end.x - currentWall.start.x) > Math.abs(currentWall.end.y - currentWall.start.y)) {
          // Горизонтальная стена - размер сверху по центру
          ctx.textAlign = 'center';
          ctx.fillText(`${(length * 1000 / 30).toFixed(0)}мм`, centerX, centerY - 12 * zoom);
        } else {
          // Вертикальная стена - размер слева по центру
          ctx.save();
          ctx.translate(centerX - 18 * zoom, centerY);
          ctx.rotate(-Math.PI / 2);
          ctx.textAlign = 'center';
          ctx.fillText(`${(length * 1000 / 30).toFixed(0)}мм`, 0, 0);
          ctx.restore();
        }
      }
    }
  };
  
  const drawElement = (ctx, element) => {
    const isSelected = selectedElement?.id === element.id;
    const isHovered = hoveredElement?.id === element.id;
    
    const scaledWidth = element.width * zoom;
    const scaledHeight = element.height * zoom;
    const scaledX = element.x * zoom;
    const scaledY = element.y * zoom;
    
    if (element.type === 'house') {
      ctx.fillStyle = isSelected ? '#d4c5e8' : isHovered ? '#f0e8f8' : '#eee8f4';
    } else {
      ctx.fillStyle = isSelected ? '#c5d4e8' : isHovered ? '#e0f0e8' : '#e8f4ee';
    }
    
    ctx.fillRect(scaledX, scaledY, scaledWidth, scaledHeight);
    
    ctx.strokeStyle = (isSelected || isHovered) ? '#df682b' : '#31323d';
    ctx.lineWidth = (isSelected || isHovered) ? Math.max(2, 3 * zoom) : Math.max(1, 2 * zoom);
    ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
    
    // Иконка замка для зафиксированного дома
    if (element.type === 'house' && houseFixed) {
      ctx.fillStyle = '#dc3545';
      ctx.font = `${Math.max(12, 14 * zoom)}px Arial`;
      ctx.textAlign = 'left';
      ctx.fillText('🔒', scaledX + 5 * zoom, scaledY + 16 * zoom);
    }
    
    // Маркеры размеров дома
    if (element.type === 'house' && zoom >= 0.3) {
      ctx.fillStyle = '#df682b';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      
      // Размер сверху
      ctx.fillText(
        `${(element.realWidth * 1000).toFixed(0)}мм`,
        scaledX + scaledWidth / 2,
        scaledY - 10 * zoom
      );
      
      // Размер слева
      ctx.save();
      ctx.translate(scaledX - 15 * zoom, scaledY + scaledHeight / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(`${(element.realHeight * 1000).toFixed(0)}мм`, 0, 0);
      ctx.restore();
    }
    
    if (zoom >= 0.3 && element.type !== 'house') {
      ctx.fillStyle = '#31323d';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      
      const centerX = scaledX + scaledWidth / 2;
      const centerY = scaledY + scaledHeight / 2;
      
      if (element.realWidth && element.realHeight) {
        ctx.fillText(
          `${(element.realWidth * 1000).toFixed(0)}×${(element.realHeight * 1000).toFixed(0)}мм`,
          centerX,
          centerY - 5 * zoom
        );
      }
    }
  };

  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    const worldX = (clientX - panOffset.x) / zoom;
    const worldY = (clientY - panOffset.y) / zoom;
    
    const houseElement = elements.find(el => el.type === 'house');
    
    // Проверяем клик по замку
    if (houseElement && houseFixed && 
        worldX >= houseElement.x && worldX <= houseElement.x + 25 &&
        worldY >= houseElement.y && worldY <= houseElement.y + 25) {
      setHouseFixed(false);
      setSelectedElement(null);
      setTimeout(() => drawCanvas(), 0);
      return;
    }
    
    // Проверяем клик по стене (находим ближайшую)
    let clickedWall = null;
    let minClickDistance = Infinity;
    
    walls.forEach(wall => {
      const dist = Math.abs((wall.end.y - wall.start.y) * worldX - (wall.end.x - wall.start.x) * worldY + wall.end.x * wall.start.y - wall.end.y * wall.start.x) / 
                  Math.sqrt(Math.pow(wall.end.y - wall.start.y, 2) + Math.pow(wall.end.x - wall.start.x, 2));
      
      if (dist < 8 && dist < minClickDistance &&
          worldX >= Math.min(wall.start.x, wall.end.x) - 8 && worldX <= Math.max(wall.start.x, wall.end.x) + 8 &&
          worldY >= Math.min(wall.start.y, wall.end.y) - 8 && worldY <= Math.max(wall.start.y, wall.end.y) + 8) {
        minClickDistance = dist;
        clickedWall = wall;
      }
    });
    
    if (clickedWall && selectedTool === 'select') {
      setIsDraggingWall(true);
      setWallDragStart({ 
        x: worldX - (clickedWall.start.x + clickedWall.end.x) / 2, 
        y: worldY - (clickedWall.start.y + clickedWall.end.y) / 2 
      });
      setSelectedElement(clickedWall);
      return;
    }
    
    // Проверяем клик по дому
    if (houseElement &&
        worldX >= houseElement.x && worldX <= houseElement.x + houseElement.width &&
        worldY >= houseElement.y && worldY <= houseElement.y + houseElement.height) {
      
      if (selectedTool === 'fix') {
        setHouseFixed(true);
        setSelectedElement(houseElement);
        setSelectedTool('select');
        return;
      }
      
      if (selectedTool === 'select' && !houseFixed) {
        setIsDraggingHouse(true);
        setHouseDragStart({ x: worldX - houseElement.x, y: worldY - houseElement.y });
        setSelectedElement(houseElement);
        return;
      }
      
      if (selectedTool === 'select') {
        setSelectedElement(houseElement);
        return;
      }
    }
    
    // Начало рисования стены
    if (selectedTool === 'wall' && isPointInsideHouse(worldX, worldY)) {
      const snappedStart = snapToHouseBounds(worldX, worldY);
      setIsDrawingWall(true);
      setWallStart(snappedStart);
      setCurrentWall({ start: snappedStart, end: snappedStart });
      return;
    }
    
    // Клик по пустому месту - снимаем выделение
    if (selectedTool === 'select') {
      setSelectedElement(null);
    }
    
    if (!isDrawingWall) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const worldX = (clientX - panOffset.x) / zoom;
    const worldY = (clientY - panOffset.y) / zoom;
    
    // Перетаскивание стены
    if (isDraggingWall && selectedElement) {
      const centerX = worldX - wallDragStart.x;
      const centerY = worldY - wallDragStart.y;
      
      const wallLength = Math.sqrt(
        Math.pow(selectedElement.end.x - selectedElement.start.x, 2) + 
        Math.pow(selectedElement.end.y - selectedElement.start.y, 2)
      );
      
      const isHorizontal = Math.abs(selectedElement.end.x - selectedElement.start.x) > Math.abs(selectedElement.end.y - selectedElement.start.y);
      
      let newStart, newEnd;
      if (isHorizontal) {
        newStart = { x: centerX - wallLength / 2, y: centerY };
        newEnd = { x: centerX + wallLength / 2, y: centerY };
      } else {
        newStart = { x: centerX, y: centerY - wallLength / 2 };
        newEnd = { x: centerX, y: centerY + wallLength / 2 };
      }
      
      // Проверяем, что стена остается в пределах дома
      if (isPointInsideHouse(newStart.x, newStart.y) && isPointInsideHouse(newEnd.x, newEnd.y)) {
        setWalls(prev => prev.map(wall => 
          wall.id === selectedElement.id 
            ? { ...wall, start: newStart, end: newEnd }
            : wall
        ));
        
        setSelectedElement(prev => ({ ...prev, start: newStart, end: newEnd }));
      }
      return;
    }
    
    // Рисование стены
    if (isDrawingWall && wallStart) {
      if (isPointInsideHouse(worldX, worldY)) {
        const snappedEnd = snapToHouseBounds(worldX, worldY);
        const deltaX = snappedEnd.x - wallStart.x;
        const deltaY = snappedEnd.y - wallStart.y;
        
        // Определяем направление (90 градусов)
        let endX, endY;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Горизонтальная линия
          endX = snappedEnd.x;
          endY = wallStart.y;
        } else {
          // Вертикальная линия
          endX = wallStart.x;
          endY = snappedEnd.y;
        }
        
        setCurrentWall({ start: wallStart, end: { x: endX, y: endY } });
      }
      return;
    }
    
    if (isDraggingHouse && !houseFixed) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      
      const worldX = (clientX - panOffset.x) / zoom;
      const worldY = (clientY - panOffset.y) / zoom;
      
      const houseElement = elements.find(el => el.type === 'house');
      if (!houseElement) return;
      
      const newX = worldX - houseDragStart.x;
      const newY = worldY - houseDragStart.y;
      
      // Ограничения по участку
      const lotX = 100;
      const lotY = 100;
      const lotW = initialData.lotSize.width * 30;
      const lotH = initialData.lotSize.height * 30;
      
      const constrainedX = Math.max(lotX, Math.min(newX, lotX + lotW - houseElement.width));
      const constrainedY = Math.max(lotY, Math.min(newY, lotY + lotH - houseElement.height));
      
      setElements(prev => prev.map(el => 
        el.type === 'house' ? { ...el, x: constrainedX, y: constrainedY } : el
      ));
    } else if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDrawingWall && currentWall) {
      const length = Math.sqrt(
        Math.pow(currentWall.end.x - currentWall.start.x, 2) + 
        Math.pow(currentWall.end.y - currentWall.start.y, 2)
      );
      
      if (length > 5) { // Минимальная длина стены
        setWalls(prev => [...prev, {
          id: Date.now(),
          start: currentWall.start,
          end: currentWall.end
        }]);
      }
      
      setIsDrawingWall(false);
      setWallStart(null);
      setCurrentWall(null);
    }
    
    setIsDragging(false);
    setIsDraggingHouse(false);
    setIsDraggingWall(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.3, Math.min(5, prev * delta)));
  };

  return (
    <>
      {view3D && (
        <House3DViewer
          elements={elements}
          walls={walls}
          doors={doors}
          windows={windows}
          initialData={initialData}
          onClose={() => setView3D(false)}
        />
      )}
      
      <div className={styles.constructorInterface}>
        <div className={styles.constructorHeader}>
          <div className={styles.headerLeft}>
            <button className={styles.backBtn} onClick={onBack}>
              ⚙️ Настройки
            </button>
            <h1>Конструктор модульных домов</h1>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.projectInfo}>
              <span>Дом: {(initialData.house.width * 1000).toFixed(0)}×{(initialData.house.height * 1000).toFixed(0)}мм</span>
              <span>Участок: {(initialData.lotSize.width * 1000).toFixed(0)}×{(initialData.lotSize.height * 1000).toFixed(0)}мм ({((initialData.lotSize.width * initialData.lotSize.height) / 100).toFixed(2)} соток)</span>
            </div>
          </div>
        </div>

        <div className={styles.constructorBody}>
          <div className={styles.workspace}>
            <canvas 
              ref={canvasRef}
              className={selectedTool === 'wall' ? styles.wallTool : ''}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={(e) => {
        handleCanvasMouseMove(e);
        
        // Подсветка элементов при наведении
        if (!isDragging && !isDraggingHouse && !isDrawingWall && selectedTool === 'select') {
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          const rect = canvas.getBoundingClientRect();
          const clientX = e.clientX - rect.left;
          const clientY = e.clientY - rect.top;
          const hoverWorldX = (clientX - panOffset.x) / zoom;
          const hoverWorldY = (clientY - panOffset.y) / zoom;
          
          // Подсвечиваем дом
          const houseElement = elements.find(el => 
            el.type === 'house' &&
            hoverWorldX >= el.x && hoverWorldX <= el.x + el.width &&
            hoverWorldY >= el.y && hoverWorldY <= el.y + el.height
          );
          
          // Подсвечиваем стены (находим ближайшую)
          let hoveredWall = null;
          let minDistance = Infinity;
          
          if (!houseElement) {
            walls.forEach(wall => {
              const dist = Math.abs((wall.end.y - wall.start.y) * hoverWorldX - (wall.end.x - wall.start.x) * hoverWorldY + wall.end.x * wall.start.y - wall.end.y * wall.start.x) / 
                          Math.sqrt(Math.pow(wall.end.y - wall.start.y, 2) + Math.pow(wall.end.x - wall.start.x, 2));
              
              if (dist < 8 && dist < minDistance &&
                  hoverWorldX >= Math.min(wall.start.x, wall.end.x) - 8 && hoverWorldX <= Math.max(wall.start.x, wall.end.x) + 8 &&
                  hoverWorldY >= Math.min(wall.start.y, wall.end.y) - 8 && hoverWorldY <= Math.max(wall.start.y, wall.end.y) + 8) {
                minDistance = dist;
                hoveredWall = wall;
              }
            });
          }
          
          setHoveredElement(houseElement || hoveredWall || null);
        } else if (selectedTool !== 'select') {
          setHoveredElement(null);
        }
      }}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              onWheel={handleWheel}
            />
          </div>

          <div className={`${styles.controlPanel} ${panelCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.panelHeader}>
              <button 
                className={styles.calculateBtn}
                title="Отправить проект на расчет"
                onClick={() => alert('Проект отправлен на расчет!')}
              >
                📊 Рассчитать проект
              </button>
              <button 
                className={styles.collapseBtn}
                title="Свернуть"
                onClick={() => setPanelCollapsed(!panelCollapsed)}
              >
                {panelCollapsed ? '◀' : '▶'}
              </button>
            </div>

            <div className={styles.panelSection}>
              <h3>Режим просмотра</h3>
              <div className={styles.viewToggle}>
                <button 
                  className={!view3D ? styles.active : ''}
                  onClick={() => setView3D(false)}
                >
                  2D План
                </button>
                <button 
                  className={view3D ? styles.active : ''}
                  onClick={() => setView3D(true)}
                >
                  3D Вид
                </button>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h3>Инструменты</h3>
              <div className={styles.toolsGrid}>
                {[
                  { id: 'select', name: 'Выбор', icon: '👆' },
                  { id: 'wall', name: 'Стена', icon: '🧱' },
                  { id: 'door', name: 'Дверь', icon: '🚪' },
                  { id: 'window', name: 'Окно', icon: '🪟' },
                  { id: 'fix', name: 'Фиксация', icon: '🔒' },
                  { id: 'rotate', name: 'Поворот', icon: '🔄' }
                ].map(tool => (
                  <button
                    key={tool.id}
                    className={`${styles.toolBtn} ${selectedTool === tool.id ? styles.active : ''}`}
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    <span className={styles.toolIcon}>{tool.icon}</span>
                    <span className={styles.toolName}>{tool.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.panelSection}>
              <h3>Управление</h3>
              <div className={styles.zoomControls}>
                <button onClick={() => setZoom(prev => Math.min(5, prev * 1.2))}>
                  🔍+
                </button>
                <span>{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(prev => Math.max(0.3, prev / 1.2))}>
                  🔍-
                </button>
                <button onClick={() => { setZoom(1); setPanOffset({ x: 0, y: 0 }); }}>
                  🎯 Сброс
                </button>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h3>Информация о проекте</h3>
              <div className={styles.projectDetails}>
                <div className={styles.detailItem}>
                  <span>Название:</span>
                  <strong>{initialData.house.title}</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Размеры дома:</span>
                  <strong>{(initialData.house.width * 1000).toFixed(0)}×{(initialData.house.height * 1000).toFixed(0)}мм</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Площадь:</span>
                  <strong>{initialData.house.area}м²</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Участок:</span>
                  <strong>{(initialData.lotSize.width * 1000).toFixed(0)}×{(initialData.lotSize.height * 1000).toFixed(0)}мм ({((initialData.lotSize.width * initialData.lotSize.height) / 100).toFixed(2)} соток)</strong>
                </div>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h3>Материалы</h3>
              <div className={styles.projectDetails}>
                <div className={styles.detailItem}>
                  <span>Стены:</span>
                  <strong>СИП-панели</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Кровля:</span>
                  <strong>Металлочерепица</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Фундамент:</span>
                  <strong>Свайно-винтовой</strong>
                </div>
              </div>
            </div>

            <div className={styles.panelSection}>
              <h3>Расчеты</h3>
              <div className={styles.projectDetails}>
                <div className={styles.detailItem}>
                  <span>Стоимость:</span>
                  <strong>от 2 500 000 ₽</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Срок строительства:</span>
                  <strong>45-60 дней</strong>
                </div>
              </div>
            </div>
          </div>
          
          {panelCollapsed && (
            <div className={styles.collapsedPanel}>
              <button 
                className={styles.expandBtn}
                onClick={() => setPanelCollapsed(false)}
                title="Развернуть панель"
              >
                ◀
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}