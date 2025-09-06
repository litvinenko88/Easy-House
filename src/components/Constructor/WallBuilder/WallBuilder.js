'use client';

import { useState, useRef, useEffect } from 'react';

export default function useWallBuilder({ 
  elements, 
  zoom, 
  panOffset, 
  selectedTool, 
  onPerimeterChange,
  canvasRef,
  drawCanvas
}) {
  const [perimeterPoints, setPerimeterPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isDraggingPoint, setIsDraggingPoint] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const initializedRef = useRef(false);

  const MIN_POINT_DISTANCE = 500 / 30; // 500мм в пикселях

  // Получаем элемент дома
  const houseElement = elements.find(el => el.type === 'house');

  // Инициализация периметра дома
  useEffect(() => {
    if (houseElement && selectedTool === 'rotate' && !initializedRef.current) {
      const initialPerimeter = [
        { id: 'top-left', x: houseElement.x, y: houseElement.y, isCorner: true },
        { id: 'top-right', x: houseElement.x + houseElement.width, y: houseElement.y, isCorner: true },
        { id: 'bottom-right', x: houseElement.x + houseElement.width, y: houseElement.y + houseElement.height, isCorner: true },
        { id: 'bottom-left', x: houseElement.x, y: houseElement.y + houseElement.height, isCorner: true }
      ];

      setPerimeterPoints(initialPerimeter);
      initializedRef.current = true;
    }
    
    // Мгновенная перерисовка при смене инструмента
    if (drawCanvas) drawCanvas();
  }, [houseElement, selectedTool]);

  // Проверка клика по стене периметра
  const isClickOnPerimeterWall = (worldX, worldY) => {
    if (!houseElement || selectedTool !== 'rotate' || perimeterPoints.length < 4) return null;

    const walls = getPerimeterWalls();
    
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      const dist = getDistanceToLine(worldX, worldY, wall.start, wall.end);
      
      if (dist < 8 && 
          worldX >= Math.min(wall.start.x, wall.end.x) - 8 && 
          worldX <= Math.max(wall.start.x, wall.end.x) + 8 &&
          worldY >= Math.min(wall.start.y, wall.end.y) - 8 && 
          worldY <= Math.max(wall.start.y, wall.end.y) + 8) {
        return { wallIndex: i, wall };
      }
    }
    return null;
  };

  // Проверка клика по точке
  const isClickOnPoint = (worldX, worldY) => {
    if (selectedTool !== 'rotate') return null;

    for (let point of perimeterPoints) {
      const distance = Math.sqrt(
        Math.pow(worldX - point.x, 2) + Math.pow(worldY - point.y, 2)
      );
      if (distance <= 8) {
        return point;
      }
    }
    return null;
  };

  // Получение стен периметра
  const getPerimeterWalls = () => {
    if (perimeterPoints.length < 4) return [];
    
    const walls = [];
    for (let i = 0; i < perimeterPoints.length; i++) {
      const start = perimeterPoints[i];
      const end = perimeterPoints[(i + 1) % perimeterPoints.length];
      walls.push({ start, end, startIndex: i, endIndex: (i + 1) % perimeterPoints.length });
    }
    return walls;
  };

  // Расстояние от точки до линии
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

  // Добавление точки на стену
  const addPointToWall = (worldX, worldY, wallInfo) => {
    const { wallIndex, wall } = wallInfo;
    
    // Проверяем минимальное расстояние до существующих точек
    for (let point of perimeterPoints) {
      const distance = Math.sqrt(
        Math.pow(worldX - point.x, 2) + Math.pow(worldY - point.y, 2)
      );
      if (distance < MIN_POINT_DISTANCE) {
        return; // Слишком близко к существующей точке
      }
    }

    // Находим ближайшую точку на линии стены
    const A = worldX - wall.start.x;
    const B = worldY - wall.start.y;
    const C = wall.end.x - wall.start.x;
    const D = wall.end.y - wall.start.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    const param = Math.max(0, Math.min(1, dot / lenSq));
    
    const newPoint = {
      id: `point-${Date.now()}`,
      x: wall.start.x + param * C,
      y: wall.start.y + param * D,
      isCorner: false
    };

    // Вставляем точку в правильное место в массиве
    const newPoints = [...perimeterPoints];
    newPoints.splice(wallIndex + 1, 0, newPoint);
    setPerimeterPoints(newPoints);
    
    // Мгновенная перерисовка
    if (drawCanvas) drawCanvas();

  };

  // Обработка перетаскивания точки
  const handlePointDrag = (worldX, worldY) => {
    if (!selectedPoint || !isDraggingPoint) return;

    // Угловые точки нельзя перемещать
    if (selectedPoint.isCorner) return;

    const pointIndex = perimeterPoints.findIndex(p => p.id === selectedPoint.id);
    if (pointIndex === -1) return;

    // Определяем направление движения строго под 90 градусов
    const deltaX = worldX - selectedPoint.x;
    const deltaY = worldY - selectedPoint.y;
    
    let newX = selectedPoint.x;
    let newY = selectedPoint.y;

    // Определяем основное направление движения и привязываем к оси
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Горизонтальное движение - двигаем только по X
      newX = worldX;
      newY = selectedPoint.y; // Y остается неизменным
    } else {
      // Вертикальное движение - двигаем только по Y
      newX = selectedPoint.x; // X остается неизменным
      newY = worldY;
    }

    // Убираем ограничения - точки могут двигаться в любом направлении

    // Проверяем минимальное расстояние до других точек
    let canMove = true;
    for (let i = 0; i < perimeterPoints.length; i++) {
      if (i === pointIndex) continue;
      const point = perimeterPoints[i];
      const distance = Math.sqrt(
        Math.pow(newX - point.x, 2) + Math.pow(newY - point.y, 2)
      );
      if (distance < MIN_POINT_DISTANCE) {
        canMove = false;
        break;
      }
    }

    if (canMove) {
      const newPoints = [...perimeterPoints];
      newPoints[pointIndex] = { ...selectedPoint, x: newX, y: newY };
      setPerimeterPoints(newPoints);
      setSelectedPoint({ ...selectedPoint, x: newX, y: newY });
      
      // Мгновенная перерисовка
      if (drawCanvas) drawCanvas();
    }
  };

  // Обработчики событий мыши
  const handleMouseDown = (e) => {
    if (selectedTool !== 'rotate') return false;

    const canvas = canvasRef.current;
    if (!canvas) return false;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const worldX = (clientX - panOffset.x) / zoom;
    const worldY = (clientY - panOffset.y) / zoom;

    // Проверяем клик по точке
    const clickedPoint = isClickOnPoint(worldX, worldY);
    if (clickedPoint) {
      setSelectedPoint(clickedPoint);
      setIsDraggingPoint(true);
      setDragStart({ x: worldX, y: worldY });
      return true; // Событие обработано
    }

    // Проверяем клик по стене периметра
    const wallInfo = isClickOnPerimeterWall(worldX, worldY);
    if (wallInfo) {
      addPointToWall(worldX, worldY, wallInfo);
      return true; // Событие обработано
    }

    return false; // Событие не обработано
  };

  const handleMouseMove = (e) => {
    if (selectedTool !== 'rotate') return false;

    const canvas = canvasRef.current;
    if (!canvas) return false;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const worldX = (clientX - panOffset.x) / zoom;
    const worldY = (clientY - panOffset.y) / zoom;

    // Обработка перетаскивания
    if (isDraggingPoint) {
      handlePointDrag(worldX, worldY);
      canvas.style.cursor = 'grabbing';
      return true;
    }

    // Изменяем курсор
    const clickedPoint = isClickOnPoint(worldX, worldY);
    const wallInfo = isClickOnPerimeterWall(worldX, worldY);
    
    if (clickedPoint && !clickedPoint.isCorner) {
      canvas.style.cursor = 'grab';
    } else if (wallInfo) {
      canvas.style.cursor = 'crosshair';
    } else if (selectedTool === 'rotate') {
      canvas.style.cursor = 'crosshair';
    }

    return false;
  };

  const handleMouseUp = () => {
    if (selectedTool !== 'rotate') return false;

    setIsDraggingPoint(false);
    setDragStart({ x: 0, y: 0 });
    
    // Уведомляем родительский компонент об изменении периметра
    if (onPerimeterChange) {
      onPerimeterChange(perimeterPoints);
    }

    return isDraggingPoint; // Возвращаем true если было перетаскивание
  };

  // Отрисовка периметра и точек
  const drawPerimeter = (ctx) => {
    if (!houseElement || perimeterPoints.length === 0) return;
    
    // Показываем деформированный периметр всегда, если есть изменения
    const hasChanges = perimeterPoints.some(point => !point.isCorner) || 
                      perimeterPoints.some((point, index) => {
                        if (index === 0) return point.x !== houseElement.x || point.y !== houseElement.y;
                        if (index === 1) return point.x !== houseElement.x + houseElement.width || point.y !== houseElement.y;
                        if (index === 2) return point.x !== houseElement.x + houseElement.width || point.y !== houseElement.y + houseElement.height;
                        if (index === 3) return point.x !== houseElement.x || point.y !== houseElement.y + houseElement.height;
                        return false;
                      });
    
    if (!hasChanges && selectedTool !== 'rotate') return;


    const walls = getPerimeterWalls();
    
    // Заливаем область деформированного дома
    if (perimeterPoints.length >= 3) {
      ctx.fillStyle = 'rgba(238, 232, 244, 0.8)';
      ctx.beginPath();
      ctx.moveTo(perimeterPoints[0].x * zoom, perimeterPoints[0].y * zoom);
      for (let i = 1; i < perimeterPoints.length; i++) {
        ctx.lineTo(perimeterPoints[i].x * zoom, perimeterPoints[i].y * zoom);
      }
      ctx.closePath();
      ctx.fill();
    }
    
    // Рисуем стены периметра
    walls.forEach(wall => {
      ctx.strokeStyle = '#df682b';
      ctx.lineWidth = Math.max(4, 5 * zoom);
      ctx.beginPath();
      ctx.moveTo(wall.start.x * zoom, wall.start.y * zoom);
      ctx.lineTo(wall.end.x * zoom, wall.end.y * zoom);
      ctx.stroke();
      
      // Показываем размеры стен
      if (zoom >= 0.3) {
        const length = Math.sqrt(
          Math.pow(wall.end.x - wall.start.x, 2) + 
          Math.pow(wall.end.y - wall.start.y, 2)
        );
        const centerX = (wall.start.x + wall.end.x) / 2 * zoom;
        const centerY = (wall.start.y + wall.end.y) / 2 * zoom;
        
        ctx.fillStyle = '#df682b';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        const lengthMm = (length * 1000 / 30).toFixed(0);
        
        if (Math.abs(wall.end.x - wall.start.x) > Math.abs(wall.end.y - wall.start.y)) {
          // Горизонтальная стена
          ctx.fillText(`${lengthMm}мм`, centerX, centerY - 12 * zoom);
        } else {
          // Вертикальная стена
          ctx.save();
          ctx.translate(centerX - 18 * zoom, centerY);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(`${lengthMm}мм`, 0, 0);
          ctx.restore();
        }
      }
    });

    // Рисуем точки редактирования только при активном инструменте
    if (selectedTool === 'rotate') {
      perimeterPoints.forEach(point => {
        const screenX = point.x * zoom;
        const screenY = point.y * zoom;
        const pointSize = Math.max(4, 5 * zoom);

        if (point.isCorner) {
          // Угловые точки (красные, неподвижные)
          ctx.fillStyle = '#dc3545';
          ctx.strokeStyle = '#ffffff';
        } else {
          // Обычные точки (синие, подвижные)
          ctx.fillStyle = '#007bff';
          ctx.strokeStyle = '#ffffff';
        }

        ctx.beginPath();
        ctx.arc(screenX, screenY, pointSize, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.stroke();

        // Подсветка выбранной точки
        if (selectedPoint && selectedPoint.id === point.id) {
          ctx.strokeStyle = '#ffd700';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(screenX, screenY, pointSize + 2, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    drawPerimeter,
    perimeterPoints
  };
}