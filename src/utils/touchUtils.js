// Утилиты для улучшения точности касаний на мобильных устройствах

export const TOUCH_TOLERANCE = 20; // Радиус толерантности для касаний в пикселях

// Функция для нормализации координат касания
export const normalizeTouchCoordinates = (touch, canvasElement) => {
  if (!canvasElement) return { x: 0, y: 0 };
  
  const rect = canvasElement.getBoundingClientRect();
  const scaleX = canvasElement.width / rect.width;
  const scaleY = canvasElement.height / rect.height;
  
  return {
    x: (touch.clientX - rect.left) * scaleX,
    y: (touch.clientY - rect.top) * scaleY,
    clientX: touch.clientX,
    clientY: touch.clientY
  };
};

// Функция для определения типа касания (тап, долгое нажатие, свайп)
export const detectTouchGesture = (startTime, startPos, endPos, duration = 300) => {
  const timeDiff = Date.now() - startTime;
  const distance = Math.sqrt(
    Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2)
  );
  
  if (timeDiff < duration && distance < TOUCH_TOLERANCE) {
    return 'tap';
  } else if (timeDiff >= duration && distance < TOUCH_TOLERANCE) {
    return 'longpress';
  } else if (distance >= TOUCH_TOLERANCE) {
    return 'swipe';
  }
  
  return 'unknown';
};

// Функция для предотвращения случайных касаний
export const isValidTouch = (touch, previousTouch, minInterval = 50) => {
  if (!previousTouch) return true;
  
  const timeDiff = touch.timeStamp - previousTouch.timeStamp;
  const distance = Math.sqrt(
    Math.pow(touch.clientX - previousTouch.clientX, 2) + 
    Math.pow(touch.clientY - previousTouch.clientY, 2)
  );
  
  // Игнорируем касания, которые слишком близко по времени и месту
  return timeDiff > minInterval || distance > TOUCH_TOLERANCE / 2;
};

// Функция для сглаживания координат касания
export const smoothTouchCoordinates = (currentPos, previousPositions = [], smoothingFactor = 0.3) => {
  if (previousPositions.length === 0) {
    return currentPos;
  }
  
  const lastPos = previousPositions[previousPositions.length - 1];
  
  return {
    x: lastPos.x + (currentPos.x - lastPos.x) * smoothingFactor,
    y: lastPos.y + (currentPos.y - lastPos.y) * smoothingFactor
  };
};

// Функция для определения направления свайпа
export const getSwipeDirection = (startPos, endPos, minDistance = 30) => {
  const deltaX = endPos.x - startPos.x;
  const deltaY = endPos.y - startPos.y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  if (distance < minDistance) return null;
  
  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
  
  if (angle >= -45 && angle <= 45) return 'right';
  if (angle >= 45 && angle <= 135) return 'down';
  if (angle >= 135 || angle <= -135) return 'left';
  if (angle >= -135 && angle <= -45) return 'up';
  
  return null;
};

// Функция для создания виртуального события мыши из касания
export const createMouseEventFromTouch = (touch, type = 'mousedown', canvasElement = null) => {
  const coords = canvasElement ? 
    normalizeTouchCoordinates(touch, canvasElement) : 
    { x: touch.clientX, y: touch.clientY, clientX: touch.clientX, clientY: touch.clientY };
  
  return {
    type,
    clientX: coords.clientX,
    clientY: coords.clientY,
    pageX: touch.pageX,
    pageY: touch.pageY,
    screenX: touch.screenX,
    screenY: touch.screenY,
    button: 0,
    buttons: 1,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    metaKey: false,
    preventDefault: () => {},
    stopPropagation: () => {},
    target: canvasElement,
    currentTarget: canvasElement,
    timeStamp: touch.timeStamp || Date.now()
  };
};

// Хук для отслеживания касаний с улучшенной точностью
export const usePreciseTouch = (canvasRef, options = {}) => {
  const {
    onTouchStart = () => {},
    onTouchMove = () => {},
    onTouchEnd = () => {},
    smoothing = true,
    gestureDetection = true
  } = options;
  
  let touchHistory = [];
  let startTime = 0;
  let startPosition = null;
  
  const handleTouchStart = (e) => {
    e.preventDefault();
    
    const touch = e.touches[0];
    const coords = normalizeTouchCoordinates(touch, canvasRef.current);
    
    startTime = Date.now();
    startPosition = coords;
    touchHistory = [coords];
    
    const mouseEvent = createMouseEventFromTouch(touch, 'mousedown', canvasRef.current);
    onTouchStart(mouseEvent, coords);
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    
    const touch = e.touches[0];
    let coords = normalizeTouchCoordinates(touch, canvasRef.current);
    
    if (smoothing && touchHistory.length > 0) {
      coords = smoothTouchCoordinates(coords, touchHistory);
    }
    
    touchHistory.push(coords);
    if (touchHistory.length > 5) {
      touchHistory.shift(); // Ограничиваем историю
    }
    
    const mouseEvent = createMouseEventFromTouch(touch, 'mousemove', canvasRef.current);
    onTouchMove(mouseEvent, coords);
  };
  
  const handleTouchEnd = (e) => {
    e.preventDefault();
    
    const endTime = Date.now();
    const lastPos = touchHistory[touchHistory.length - 1] || startPosition;
    
    let gesture = null;
    if (gestureDetection && startPosition) {
      gesture = detectTouchGesture(startTime, startPosition, lastPos);
    }
    
    const mouseEvent = {
      type: 'mouseup',
      preventDefault: () => {},
      stopPropagation: () => {},
      timeStamp: endTime
    };
    
    onTouchEnd(mouseEvent, lastPos, gesture);
    
    // Сброс состояния
    touchHistory = [];
    startTime = 0;
    startPosition = null;
  };
  
  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};