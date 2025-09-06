'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import useWallBuilder from '../WallBuilder/WallBuilder';
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
  const [wallIcons, setWallIcons] = useState({ delete: null, rotate: null });
  const [wallResizePoints, setWallResizePoints] = useState({ start: null, end: null });
  const [isDraggingResizePoint, setIsDraggingResizePoint] = useState(false);
  const [resizePointType, setResizePointType] = useState(null);
  const [perimeterPoints, setPerimeterPoints] = useState([]);
  const [isDraggingDoor, setIsDraggingDoor] = useState(false);
  const [doorDragStart, setDoorDragStart] = useState({ x: 0, y: 0 });

  const SCALE = 30;
  
  // Вспомогательные функции для работы с дверями
  const getDistanceToLine = (px, py, lineStart, lineEnd) => {
    const A = px - lineStart.x;
    const B = py - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    if (lenSq === 0) return Math.sqrt(A * A + B * B);
    let param = dot / lenSq;
    param = Math.max(0, Math.min(1, param));
    const xx = lineStart.x + param * C;
    const yy = lineStart.y + param * D;
    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  const getProjectedPoint = (px, py, lineStart, lineEnd) => {
    const A = px - lineStart.x;
    const B = py - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    if (lenSq === 0) return { x: lineStart.x, y: lineStart.y };
    let param = dot / lenSq;
    param = Math.max(0, Math.min(1, param));
    return {
      x: lineStart.x + param * C,
      y: lineStart.y + param * D
    };
  };

  const isPointInsideHouse = (x, y) => {
    // Если есть деформированный периметр, используем его
    if (perimeterPoints.length >= 3) {
      // Алгоритм ray casting для проверки точки внутри полигона
      let inside = false;
      for (let i = 0, j = perimeterPoints.length - 1; i < perimeterPoints.length; j = i++) {
        const xi = perimeterPoints[i].x;
        const yi = perimeterPoints[i].y;
        const xj = perimeterPoints[j].x;
        const yj = perimeterPoints[j].y;
        
        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
          inside = !inside;
        }
      }
      return inside;
    }
    
    // Иначе используем обычный прямоугольник
    return elements.some(el => 
      el.type === 'house' &&
      x >= el.x && x <= el.x + el.width &&
      y >= el.y && y <= el.y + el.height
    );
  };

  const snapToHouseBounds = (x, y) => {
    const snapDistance = 30; // Увеличиваем расстояние привязки
    let snappedX = x;
    let snappedY = y;
    
    // Если есть деформированный периметр, привязываемся к его границам
    if (perimeterPoints.length >= 3) {
      for (let i = 0; i < perimeterPoints.length; i++) {
        const start = perimeterPoints[i];
        const end = perimeterPoints[(i + 1) % perimeterPoints.length];
        
        // Привязка к точкам периметра
        if (Math.abs(x - start.x) < snapDistance && Math.abs(y - start.y) < snapDistance) {
          snappedX = start.x;
          snappedY = start.y;
        }
        
        // Привязка к линиям периметра
        const A = x - start.x;
        const B = y - start.y;
        const C = end.x - start.x;
        const D = end.y - start.y;
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        
        if (lenSq > 0) {
          const param = Math.max(0, Math.min(1, dot / lenSq));
          const projX = start.x + param * C;
          const projY = start.y + param * D;
          const dist = Math.sqrt(Math.pow(x - projX, 2) + Math.pow(y - projY, 2));
          
          if (dist < snapDistance) {
            snappedX = projX;
            snappedY = projY;
          }
        }
      }
    } else {
      // Обычная привязка к прямоугольному дому
      elements.forEach(el => {
        if (el.type === 'house') {
          if (Math.abs(x - el.x) < snapDistance) snappedX = el.x;
          if (Math.abs(x - (el.x + el.width)) < snapDistance) snappedX = el.x + el.width;
          if (Math.abs(y - el.y) < snapDistance) snappedY = el.y;
          if (Math.abs(y - (el.y + el.height)) < snapDistance) snappedY = el.y + el.height;
        }
      });
    }
    
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
  }, [zoom, panOffset, initialData, selectedElement, elements, walls, doors, windows, currentWall, perimeterPoints]);
  
  // Сброс курсора при смене инструмента
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && selectedTool !== 'rotate') {
      canvas.style.cursor = '';
    }
  }, [selectedTool]);
  
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
    drawDoors(ctx);
    drawCurrentWall(ctx);
    drawWallIcons(ctx);
    drawWallResizePoints(ctx);
    
    // Отрисовка периметра для инструмента "Построение стен"
    if (wallBuilder) {
      wallBuilder.drawPerimeter(ctx);
    }
    
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

  const drawDoors = (ctx) => {
    doors.forEach(door => {
      const isSelected = selectedElement?.id === door.id;
      const isHovered = hoveredElement?.id === door.id;
      
      // Определяем направление стены
      const wallDx = door.wallEnd.x - door.wallStart.x;
      const wallDy = door.wallEnd.y - door.wallStart.y;
      const wallLength = Math.sqrt(wallDx * wallDx + wallDy * wallDy);
      const wallUnitX = wallDx / wallLength;
      const wallUnitY = wallDy / wallLength;
      
      // Перпендикуляр к стене
      const perpX = -wallUnitY;
      const perpY = wallUnitX;
      
      const doorHalfWidth = door.width / 2;
      const doorOpenLength = 25; // Длина открытой двери
      
      // Проем в стене
      const gapStart = {
        x: door.x - wallUnitX * doorHalfWidth,
        y: door.y - wallUnitY * doorHalfWidth
      };
      const gapEnd = {
        x: door.x + wallUnitX * doorHalfWidth,
        y: door.y + wallUnitY * doorHalfWidth
      };
      
      // Отрисовка проема (белая линия)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = Math.max(4, 5 * zoom);
      ctx.beginPath();
      ctx.moveTo(gapStart.x * zoom, gapStart.y * zoom);
      ctx.lineTo(gapEnd.x * zoom, gapEnd.y * zoom);
      ctx.stroke();
      
      // Отрисовка открытой двери (дуга)
      ctx.strokeStyle = (isSelected || isHovered) ? '#df682b' : '#666666';
      ctx.lineWidth = Math.max(2, 3 * zoom);
      ctx.setLineDash([3, 3]);
      
      // Дуга открытой двери
      const centerX = door.x * zoom;
      const centerY = door.y * zoom;
      const radius = doorOpenLength * zoom;
      
      // Угол направления стены
      const wallAngle = Math.atan2(wallDy, wallDx);
      const startAngle = wallAngle + Math.PI / 2;
      const endAngle = wallAngle + Math.PI;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.stroke();
      
      // Линия дверного полотна
      const doorEndX = centerX + Math.cos(endAngle) * radius;
      const doorEndY = centerY + Math.sin(endAngle) * radius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(doorEndX, doorEndY);
      ctx.stroke();
      
      ctx.setLineDash([]);
      
      // Подсветка выбранной двери
      if (isSelected) {
        ctx.fillStyle = 'rgba(223, 104, 43, 0.3)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
        ctx.fill();
      }
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

  const drawWallIcons = (ctx) => {
    if (selectedElement && selectedElement.start && selectedElement.end && selectedTool === 'select') {
      const centerX = (selectedElement.start.x + selectedElement.end.x) / 2 * zoom;
      const centerY = (selectedElement.start.y + selectedElement.end.y) / 2 * zoom;
      
      const iconSize = Math.max(20, 25 * zoom);
      const iconSpacing = Math.max(30, 35 * zoom);
      
      // Иконка удаления
      const deleteX = centerX - iconSpacing / 2;
      const deleteY = centerY - iconSize - 10;
      
      ctx.fillStyle = '#dc3545';
      ctx.font = `${Math.max(16, 18 * zoom)}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('🗑️', deleteX, deleteY + 4);
      
      // Иконка поворота
      const rotateX = centerX + iconSpacing / 2;
      const rotateY = centerY - iconSize - 10;
      
      ctx.fillStyle = '#007bff';
      ctx.fillText('🔄', rotateX, rotateY + 4);
      
      // Сохраняем позиции иконок (в экранных координатах)
      setWallIcons({
        delete: { x: deleteX, y: deleteY, size: iconSize },
        rotate: { x: rotateX, y: rotateY, size: iconSize }
      });
    } else {
      setWallIcons({ delete: null, rotate: null });
    }
  };

  const drawWallResizePoints = (ctx) => {
    if (selectedElement && selectedElement.start && selectedElement.end && selectedTool === 'select') {
      const startX = selectedElement.start.x * zoom;
      const startY = selectedElement.start.y * zoom;
      const endX = selectedElement.end.x * zoom;
      const endY = selectedElement.end.y * zoom;
      
      const pointSize = Math.max(6, 8 * zoom);
      
      // Точка начала стены
      ctx.fillStyle = '#007bff';
      ctx.beginPath();
      ctx.arc(startX, startY, pointSize, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Точка конца стены
      ctx.fillStyle = '#007bff';
      ctx.beginPath();
      ctx.arc(endX, endY, pointSize, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Сохраняем позиции точек
      setWallResizePoints({
        start: { x: startX, y: startY, size: pointSize },
        end: { x: endX, y: endY, size: pointSize }
      });
    } else {
      setWallResizePoints({ start: null, end: null });
    }
  };
  
  const drawElement = (ctx, element) => {
      const isSelected = selectedElement?.id === element.id;
    const isHovered = hoveredElement?.id === element.id;
    
    // Отрисовываем деформированный дом вместо обычного
    if (element.type === 'house' && perimeterPoints.length > 0) {
      // Заливаем область деформированного дома
      ctx.fillStyle = isSelected ? '#d4c5e8' : isHovered ? '#f0e8f8' : '#eee8f4';
      ctx.beginPath();
      ctx.moveTo(perimeterPoints[0].x * zoom, perimeterPoints[0].y * zoom);
      for (let i = 1; i < perimeterPoints.length; i++) {
        ctx.lineTo(perimeterPoints[i].x * zoom, perimeterPoints[i].y * zoom);
      }
      ctx.closePath();
      ctx.fill();
      
      // Обводка деформированного периметра
      ctx.strokeStyle = (isSelected || isHovered) ? '#df682b' : '#31323d';
      ctx.lineWidth = (isSelected || isHovered) ? Math.max(4, 5 * zoom) : Math.max(3, 4 * zoom);
      ctx.stroke();
      
      // Показываем размеры стен периметра
      if (zoom >= 0.3) {
        for (let i = 0; i < perimeterPoints.length; i++) {
          const start = perimeterPoints[i];
          const end = perimeterPoints[(i + 1) % perimeterPoints.length];
          
          const length = Math.sqrt(
            Math.pow(end.x - start.x, 2) + 
            Math.pow(end.y - start.y, 2)
          );
          const centerX = (start.x + end.x) / 2;
          const centerY = (start.y + end.y) / 2;
          
          // Вычисляем нормаль к стене (перпендикуляр наружу)
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const normalX = dy / length; // Перпендикуляр наружу
          const normalY = -dx / length;
          
          // Размещаем текст снаружи дома на расстоянии 30 пикселей
          const offsetDistance = 30;
          const textX = (centerX + normalX * offsetDistance) * zoom;
          const textY = (centerY + normalY * offsetDistance) * zoom;
          
          ctx.fillStyle = '#df682b';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          
          const lengthMm = (length * 1000 / 30).toFixed(0);
          
          // Поворачиваем текст под углом стены
          ctx.save();
          ctx.translate(textX, textY);
          const angle = Math.atan2(dy, dx);
          ctx.rotate(angle);
          ctx.fillText(`${lengthMm}мм`, 0, -5);
          ctx.restore();
        }
      }
      return;
    }
    
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
    ctx.lineWidth = (isSelected || isHovered) ? Math.max(4, 5 * zoom) : Math.max(3, 4 * zoom);
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
    // Проверяем обработку WallBuilder
    if (wallBuilder && wallBuilder.handleMouseDown(e)) {
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    const worldX = (clientX - panOffset.x) / zoom;
    const worldY = (clientY - panOffset.y) / zoom;
    
    // Проверяем клик по точкам изменения размера
    const resizeClickX = clientX - panOffset.x;
    const resizeClickY = clientY - panOffset.y;
    
    if (selectedElement && selectedElement.start && wallResizePoints.start && 
        Math.abs(resizeClickX - wallResizePoints.start.x) <= wallResizePoints.start.size && 
        Math.abs(resizeClickY - wallResizePoints.start.y) <= wallResizePoints.start.size) {
      setIsDraggingResizePoint(true);
      setResizePointType('start');
      return;
    }
    
    if (selectedElement && selectedElement.start && wallResizePoints.end && 
        Math.abs(resizeClickX - wallResizePoints.end.x) <= wallResizePoints.end.size && 
        Math.abs(resizeClickY - wallResizePoints.end.y) <= wallResizePoints.end.size) {
      setIsDraggingResizePoint(true);
      setResizePointType('end');
      return;
    }
    
    // Проверяем клик по иконкам стены
    const iconClickX = clientX - panOffset.x;
    const iconClickY = clientY - panOffset.y;
    
    if (selectedElement && selectedElement.start && wallIcons.delete && 
        Math.abs(iconClickX - wallIcons.delete.x) <= wallIcons.delete.size/2 && 
        Math.abs(iconClickY - wallIcons.delete.y) <= wallIcons.delete.size/2) {
      e.preventDefault();
      e.stopPropagation();
      // Удаляем стену
      setWalls(prev => prev.filter(wall => wall.id !== selectedElement.id));
      setSelectedElement(null);
      return;
    }
    
    if (selectedElement && selectedElement.start && wallIcons.rotate && 
        Math.abs(iconClickX - wallIcons.rotate.x) <= wallIcons.rotate.size/2 && 
        Math.abs(iconClickY - wallIcons.rotate.y) <= wallIcons.rotate.size/2) {
      e.preventDefault();
      e.stopPropagation();
      // Поворачиваем стену на 90 градусов
      const centerX = (selectedElement.start.x + selectedElement.end.x) / 2;
      const centerY = (selectedElement.start.y + selectedElement.end.y) / 2;
      const deltaX = selectedElement.end.x - selectedElement.start.x;
      const deltaY = selectedElement.end.y - selectedElement.start.y;
      
      // Поворот на 90 градусов: (x,y) -> (-y,x)
      const newDeltaX = -deltaY;
      const newDeltaY = deltaX;
      
      const newStart = { x: centerX - newDeltaX/2, y: centerY - newDeltaY/2 };
      const newEnd = { x: centerX + newDeltaX/2, y: centerY + newDeltaY/2 };
      
      // Проверяем, что повёрнутая стена остаётся в доме
      const houseElement = elements.find(el => el.type === 'house');
      if (houseElement && 
          newStart.x >= houseElement.x && newStart.x <= houseElement.x + houseElement.width &&
          newStart.y >= houseElement.y && newStart.y <= houseElement.y + houseElement.height &&
          newEnd.x >= houseElement.x && newEnd.x <= houseElement.x + houseElement.width &&
          newEnd.y >= houseElement.y && newEnd.y <= houseElement.y + houseElement.height) {
        
        setWalls(prev => prev.map(wall => 
          wall.id === selectedElement.id 
            ? { ...wall, start: newStart, end: newEnd }
            : wall
        ));
        
        setSelectedElement(prev => ({ ...prev, start: newStart, end: newEnd }));
      }
      return;
    }
    
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
    
    // Проверяем клик по двери
    let clickedDoor = null;
    doors.forEach(door => {
      const distance = Math.sqrt(
        Math.pow(worldX - door.x, 2) + Math.pow(worldY - door.y, 2)
      );
      if (distance <= 25) { // Радиус клика по двери
        clickedDoor = door;
      }
    });
    
    if (clickedDoor && selectedTool === 'select') {
      setSelectedElement(clickedDoor);
      setIsDraggingDoor(true);
      setDoorDragStart({ x: worldX - clickedDoor.x, y: worldY - clickedDoor.y });
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
    
    // Размещение двери на стене
    if (selectedTool === 'door') {
      // Проверяем клик по стене
      let clickedWall = null;
      let minClickDistance = Infinity;
      
      // Проверяем стены периметра
      if (perimeterPoints.length >= 4) {
        for (let i = 0; i < perimeterPoints.length; i++) {
          const start = perimeterPoints[i];
          const end = perimeterPoints[(i + 1) % perimeterPoints.length];
          const dist = getDistanceToLine(worldX, worldY, start, end);
          
          if (dist < 8 && dist < minClickDistance &&
              worldX >= Math.min(start.x, end.x) - 8 && worldX <= Math.max(start.x, end.x) + 8 &&
              worldY >= Math.min(start.y, end.y) - 8 && worldY <= Math.max(start.y, end.y) + 8) {
            minClickDistance = dist;
            clickedWall = { start, end, type: 'perimeter', wallId: `perimeter-${i}` };
          }
        }
      } else {
        // Если нет деформированного периметра, используем обычные стены дома
        const houseElement = elements.find(el => el.type === 'house');
        if (houseElement) {
          const houseWalls = [
            { start: { x: houseElement.x, y: houseElement.y }, end: { x: houseElement.x + houseElement.width, y: houseElement.y } },
            { start: { x: houseElement.x + houseElement.width, y: houseElement.y }, end: { x: houseElement.x + houseElement.width, y: houseElement.y + houseElement.height } },
            { start: { x: houseElement.x + houseElement.width, y: houseElement.y + houseElement.height }, end: { x: houseElement.x, y: houseElement.y + houseElement.height } },
            { start: { x: houseElement.x, y: houseElement.y + houseElement.height }, end: { x: houseElement.x, y: houseElement.y } }
          ];
          
          houseWalls.forEach((wall, i) => {
            const dist = getDistanceToLine(worldX, worldY, wall.start, wall.end);
            
            if (dist < 8 && dist < minClickDistance &&
                worldX >= Math.min(wall.start.x, wall.end.x) - 8 && worldX <= Math.max(wall.start.x, wall.end.x) + 8 &&
                worldY >= Math.min(wall.start.y, wall.end.y) - 8 && worldY <= Math.max(wall.start.y, wall.end.y) + 8) {
              minClickDistance = dist;
              clickedWall = { start: wall.start, end: wall.end, type: 'perimeter', wallId: `house-${i}` };
            }
          });
        }
      }
      
      // Проверяем внутренние стены
      walls.forEach(wall => {
        const dist = getDistanceToLine(worldX, worldY, wall.start, wall.end);
        
        if (dist < 8 && dist < minClickDistance &&
            worldX >= Math.min(wall.start.x, wall.end.x) - 8 && worldX <= Math.max(wall.start.x, wall.end.x) + 8 &&
            worldY >= Math.min(wall.start.y, wall.end.y) - 8 && worldY <= Math.max(wall.start.y, wall.end.y) + 8) {
          minClickDistance = dist;
          clickedWall = { start: wall.start, end: wall.end, type: 'internal', wallId: wall.id };
        }
      });
      
      if (clickedWall) {
        // Проецируем точку клика на стену
        const projectedPoint = getProjectedPoint(worldX, worldY, clickedWall.start, clickedWall.end);
        
        // Проверяем, что дверь не пересекается с другими дверями
        const doorWidth = 30; // 900мм в пикселях
        const canPlaceDoor = !doors.some(door => {
          if (door.wallId !== clickedWall.wallId || door.type !== clickedWall.type) return false;
          const distance = Math.sqrt(
            Math.pow(projectedPoint.x - door.x, 2) + Math.pow(projectedPoint.y - door.y, 2)
          );
          return distance < doorWidth + 10; // Минимальное расстояние между дверями
        });
        
        if (canPlaceDoor) {
          const newDoor = {
            id: Date.now(),
            x: projectedPoint.x,
            y: projectedPoint.y,
            width: doorWidth,
            wallStart: clickedWall.start,
            wallEnd: clickedWall.end,
            wallId: clickedWall.wallId,
            type: clickedWall.type
          };
          
          setDoors(prev => [...prev, newDoor]);
        }
      }
      return;
    }
    
    // Начало рисования стены
    if (selectedTool === 'wall' && isPointInsideHouse(worldX, worldY)) {
      setIsDrawingWall(true);
      setWallStart({ x: worldX, y: worldY }); // Используем точную позицию клика
      setCurrentWall({ start: { x: worldX, y: worldY }, end: { x: worldX, y: worldY } });
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
    // Проверяем обработку WallBuilder
    if (wallBuilder && wallBuilder.handleMouseMove(e)) {
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const worldX = (clientX - panOffset.x) / zoom;
    const worldY = (clientY - panOffset.y) / zoom;
    
    // Изменение размера стены
    if (isDraggingResizePoint && selectedElement && resizePointType) {
      const isHorizontal = Math.abs(selectedElement.end.x - selectedElement.start.x) > Math.abs(selectedElement.end.y - selectedElement.start.y);
      
      let newStart = selectedElement.start;
      let newEnd = selectedElement.end;
      
      if (resizePointType === 'start') {
        if (isHorizontal) {
          newStart = { x: worldX, y: selectedElement.start.y };
        } else {
          newStart = { x: selectedElement.start.x, y: worldY };
        }
      } else if (resizePointType === 'end') {
        if (isHorizontal) {
          newEnd = { x: worldX, y: selectedElement.end.y };
        } else {
          newEnd = { x: selectedElement.end.x, y: worldY };
        }
      }
      
      // Проверяем минимальную длину и что обе точки внутри дома
      const newLength = Math.sqrt(
        Math.pow(newEnd.x - newStart.x, 2) + 
        Math.pow(newEnd.y - newStart.y, 2)
      );
      
      if (newLength > 10 && isPointInsideHouse(newStart.x, newStart.y) && isPointInsideHouse(newEnd.x, newEnd.y)) {
        // Определяем направление изменяемой стены
        const isNewWallHorizontal = Math.abs(newEnd.x - newStart.x) > Math.abs(newEnd.y - newStart.y);
        
        // Проверяем наложение только с стенами того же направления
        const hasOverlap = walls.some(wall => {
          if (wall.id === selectedElement.id) return false; // Не проверяем саму себя
          
          const isExistingWallHorizontal = Math.abs(wall.end.x - wall.start.x) > Math.abs(wall.end.y - wall.start.y);
          
          // Проверяем наложение только если стены одного направления
          if (isNewWallHorizontal !== isExistingWallHorizontal) {
            return false; // Разрешаем пересечение перпендикулярных стен
          }
          
          // Проверяем наложение стен одного направления
          if (isNewWallHorizontal) {
            // Горизонтальные стены - проверяем совпадение по Y и пересечение по X
            const yDiff = Math.abs(newStart.y - wall.start.y);
            if (yDiff < 10) { // Стены на одной линии по Y
              const newMinX = Math.min(newStart.x, newEnd.x);
              const newMaxX = Math.max(newStart.x, newEnd.x);
              const existingMinX = Math.min(wall.start.x, wall.end.x);
              const existingMaxX = Math.max(wall.start.x, wall.end.x);
              
              return !(newMaxX < existingMinX || newMinX > existingMaxX); // Есть пересечение
            }
          } else {
            // Вертикальные стены - проверяем совпадение по X и пересечение по Y
            const xDiff = Math.abs(newStart.x - wall.start.x);
            if (xDiff < 10) { // Стены на одной линии по X
              const newMinY = Math.min(newStart.y, newEnd.y);
              const newMaxY = Math.max(newStart.y, newEnd.y);
              const existingMinY = Math.min(wall.start.y, wall.end.y);
              const existingMaxY = Math.max(wall.start.y, wall.end.y);
              
              return !(newMaxY < existingMinY || newMinY > existingMaxY); // Есть пересечение
            }
          }
          
          return false;
        });
        
        if (!hasOverlap) {
          setWalls(prev => prev.map(wall => 
            wall.id === selectedElement.id 
              ? { ...wall, start: newStart, end: newEnd }
              : wall
          ));
          
          setSelectedElement(prev => ({ ...prev, start: newStart, end: newEnd }));
        }
      }
      return;
    }
    
    // Перетаскивание двери по стене
    if (isDraggingDoor && selectedElement && selectedElement.wallStart) {
      const newX = worldX - doorDragStart.x;
      const newY = worldY - doorDragStart.y;
      
      // Проецируем новую позицию на стену
      const projectedPoint = getProjectedPoint(newX, newY, selectedElement.wallStart, selectedElement.wallEnd);
      
      // Проверяем, что новая позиция не пересекается с другими дверями
      const canMoveDoor = !doors.some(door => {
        if (door.id === selectedElement.id) return false;
        if (door.wallId !== selectedElement.wallId || door.type !== selectedElement.type) return false;
        const distance = Math.sqrt(
          Math.pow(projectedPoint.x - door.x, 2) + Math.pow(projectedPoint.y - door.y, 2)
        );
        return distance < 40; // Минимальное расстояние
      });
      
      if (canMoveDoor) {
        setDoors(prev => prev.map(door => 
          door.id === selectedElement.id 
            ? { ...door, x: projectedPoint.x, y: projectedPoint.y }
            : door
        ));
        
        setSelectedElement(prev => ({ ...prev, x: projectedPoint.x, y: projectedPoint.y }));
      }
      return;
    }
    
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
      
      // Проверяем, что обе точки стены остаются внутри дома
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
      const deltaX = worldX - wallStart.x;
      const deltaY = worldY - wallStart.y;
      
      // Определяем направление (90 градусов)
      let endX, endY;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        endX = worldX;
        endY = wallStart.y;
      } else {
        endX = wallStart.x;
        endY = worldY;
      }
      
      if (isPointInsideHouse(endX, endY)) {
        // Определяем направление новой стены
        const isNewWallHorizontal = Math.abs(endX - wallStart.x) > Math.abs(endY - wallStart.y);
        
        // Проверяем наложение только с стенами того же направления
        const wouldOverlap = walls.some(wall => {
          const isExistingWallHorizontal = Math.abs(wall.end.x - wall.start.x) > Math.abs(wall.end.y - wall.start.y);
          
          // Проверяем наложение только если стены одного направления
          if (isNewWallHorizontal !== isExistingWallHorizontal) {
            return false; // Разрешаем пересечение перпендикулярных стен
          }
          
          // Проверяем наложение стен одного направления
          if (isNewWallHorizontal) {
            // Горизонтальные стены - проверяем совпадение по Y и пересечение по X
            const yDiff = Math.abs(wallStart.y - wall.start.y);
            if (yDiff < 10) { // Стены на одной линии по Y
              const newMinX = Math.min(wallStart.x, endX);
              const newMaxX = Math.max(wallStart.x, endX);
              const existingMinX = Math.min(wall.start.x, wall.end.x);
              const existingMaxX = Math.max(wall.start.x, wall.end.x);
              
              return !(newMaxX < existingMinX || newMinX > existingMaxX); // Есть пересечение
            }
          } else {
            // Вертикальные стены - проверяем совпадение по X и пересечение по Y
            const xDiff = Math.abs(wallStart.x - wall.start.x);
            if (xDiff < 10) { // Стены на одной линии по X
              const newMinY = Math.min(wallStart.y, endY);
              const newMaxY = Math.max(wallStart.y, endY);
              const existingMinY = Math.min(wall.start.y, wall.end.y);
              const existingMaxY = Math.max(wall.start.y, wall.end.y);
              
              return !(newMaxY < existingMinY || newMinY > existingMaxY); // Есть пересечение
            }
          }
          
          return false;
        });
        
        if (!wouldOverlap) {
          setCurrentWall({ start: wallStart, end: { x: endX, y: endY } });
        }
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
    // Проверяем обработку WallBuilder
    if (wallBuilder && wallBuilder.handleMouseUp()) {
      return;
    }
    
    if (isDrawingWall && currentWall) {
      const length = Math.sqrt(
        Math.pow(currentWall.end.x - currentWall.start.x, 2) + 
        Math.pow(currentWall.end.y - currentWall.start.y, 2)
      );
      
      if (length > 5) { // Минимальная длина стены
        // Определяем направление новой стены
        const isNewWallHorizontal = Math.abs(currentWall.end.x - currentWall.start.x) > Math.abs(currentWall.end.y - currentWall.start.y);
        
        // Проверяем наложение только с стенами того же направления
        const hasOverlap = walls.some(wall => {
          const isExistingWallHorizontal = Math.abs(wall.end.x - wall.start.x) > Math.abs(wall.end.y - wall.start.y);
          
          // Проверяем наложение только если стены одного направления
          if (isNewWallHorizontal !== isExistingWallHorizontal) {
            return false; // Разрешаем пересечение перпендикулярных стен
          }
          
          // Проверяем наложение стен одного направления
          if (isNewWallHorizontal) {
            // Горизонтальные стены - проверяем совпадение по Y и пересечение по X
            const yDiff = Math.abs(currentWall.start.y - wall.start.y);
            if (yDiff < 10) { // Стены на одной линии по Y
              const newMinX = Math.min(currentWall.start.x, currentWall.end.x);
              const newMaxX = Math.max(currentWall.start.x, currentWall.end.x);
              const existingMinX = Math.min(wall.start.x, wall.end.x);
              const existingMaxX = Math.max(wall.start.x, wall.end.x);
              
              return !(newMaxX < existingMinX || newMinX > existingMaxX); // Есть пересечение
            }
          } else {
            // Вертикальные стены - проверяем совпадение по X и пересечение по Y
            const xDiff = Math.abs(currentWall.start.x - wall.start.x);
            if (xDiff < 10) { // Стены на одной линии по X
              const newMinY = Math.min(currentWall.start.y, currentWall.end.y);
              const newMaxY = Math.max(currentWall.start.y, currentWall.end.y);
              const existingMinY = Math.min(wall.start.y, wall.end.y);
              const existingMaxY = Math.max(wall.start.y, wall.end.y);
              
              return !(newMaxY < existingMinY || newMinY > existingMaxY); // Есть пересечение
            }
          }
          
          return false;
        });
        
        if (!hasOverlap) {
          setWalls(prev => [...prev, {
            id: Date.now(),
            start: currentWall.start,
            end: currentWall.end
          }]);
        }
      }
      
      setIsDrawingWall(false);
      setWallStart(null);
      setCurrentWall(null);
    }
    
    setIsDragging(false);
    setIsDraggingHouse(false);
    setIsDraggingWall(false);
    setIsDraggingResizePoint(false);
    setResizePointType(null);
    setIsDraggingDoor(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.3, Math.min(5, prev * delta)));
  };

  // Использование WallBuilder
  const wallBuilder = useWallBuilder({
    elements,
    zoom,
    panOffset,
    selectedTool,
    onPerimeterChange: setPerimeterPoints,
    canvasRef,
    drawCanvas
  });

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
              className={selectedTool === 'wall' || selectedTool === 'rotate' ? styles.wallTool : selectedTool === 'door' ? styles.doorTool : ''}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={(e) => {
        handleCanvasMouseMove(e);
        
        // Подсветка элементов при наведении
        if (!isDragging && !isDraggingHouse && !isDrawingWall && selectedTool === 'select' && selectedTool !== 'rotate') {
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          const rect = canvas.getBoundingClientRect();
          const clientX = e.clientX - rect.left;
          const clientY = e.clientY - rect.top;
          const hoverWorldX = (clientX - panOffset.x) / zoom;
          const hoverWorldY = (clientY - panOffset.y) / zoom;
          
          // Сначала проверяем двери
          let hoveredDoor = null;
          doors.forEach(door => {
            const distance = Math.sqrt(
              Math.pow(hoverWorldX - door.x, 2) + Math.pow(hoverWorldY - door.y, 2)
            );
            if (distance <= 25) {
              hoveredDoor = door;
            }
          });
          
          // Потом проверяем стены
          let hoveredWall = null;
          let minDistance = Infinity;
          
          if (!hoveredDoor) {
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
          
          // Если ни дверь, ни стена не найдены, проверяем дом
          let houseElement = null;
          if (!hoveredDoor && !hoveredWall) {
            houseElement = elements.find(el => 
              el.type === 'house' &&
              hoverWorldX >= el.x && hoverWorldX <= el.x + el.width &&
              hoverWorldY >= el.y && hoverWorldY <= el.y + el.height
            );
          }
          
          setHoveredElement(hoveredDoor || hoveredWall || houseElement || null);
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
                  { id: 'rotate', name: 'Построение стен', icon: '📐' }
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
              <button 
                className={styles.resetLayoutBtn}
                onClick={() => {
                  setWalls([]);
                  setDoors([]);
                  setWindows([]);
                  setPerimeterPoints([]);
                  setSelectedElement(null);
                  setSelectedTool('select');
                  if (wallBuilder && wallBuilder.resetInitialized) {
                    wallBuilder.resetInitialized();
                  }
                }}
              >
                🗑️ Сбросить планировку
              </button>
            </div>

            <div className={styles.panelSection}>
              <h3>Управление</h3>
              <div className={styles.zoomControls} style={{ display: 'flex', gap: '5px', width: '100%' }}>
                <button onClick={() => setZoom(prev => Math.min(5, prev * 1.2))} style={{ flex: 1 }}>
                  🔍+
                </button>
                <span style={{ minWidth: '50px', textAlign: 'center', alignSelf: 'center' }}>{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(prev => Math.max(0.3, prev / 1.2))} style={{ flex: 1 }}>
                  🔍-
                </button>
              </div>
              <button 
                className={styles.resetBtn}
                onClick={() => { setZoom(1); setPanOffset({ x: 0, y: 0 }); }}
                style={{ width: '100%', marginTop: '10px' }}
              >
                🎯 Сброс
              </button>
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