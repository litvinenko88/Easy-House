// Утилиты для работы с устройствами и жестами

export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    window.innerWidth <= 768 ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};

export const isTabletDevice = () => {
  if (typeof window === 'undefined') return false;
  
  return (
    window.innerWidth > 768 && 
    window.innerWidth <= 1024 &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
};

export const getTouchDistance = (touch1, touch2) => {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
};

export const getTouchCenter = (touch1, touch2) => {
  return {
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch1.clientY + touch2.clientY) / 2
  };
};

export const preventZoom = (e) => {
  if (e.touches && e.touches.length > 1) {
    e.preventDefault();
  }
};

export const addMobileEventListeners = (element, handlers) => {
  if (!element || !isMobileDevice()) return;

  const { onTouchStart, onTouchMove, onTouchEnd } = handlers;

  if (onTouchStart) {
    element.addEventListener('touchstart', onTouchStart, { passive: false });
  }
  
  if (onTouchMove) {
    element.addEventListener('touchmove', onTouchMove, { passive: false });
  }
  
  if (onTouchEnd) {
    element.addEventListener('touchend', onTouchEnd, { passive: false });
  }
};

export const removeMobileEventListeners = (element, handlers) => {
  if (!element) return;

  const { onTouchStart, onTouchMove, onTouchEnd } = handlers;

  if (onTouchStart) {
    element.removeEventListener('touchstart', onTouchStart);
  }
  
  if (onTouchMove) {
    element.removeEventListener('touchmove', onTouchMove);
  }
  
  if (onTouchEnd) {
    element.removeEventListener('touchend', onTouchEnd);
  }
};

// Хук для работы с мобильными жестами
export const useMobileGestures = (canvasRef, options = {}) => {
  const {
    onPinch = () => {},
    onPan = () => {},
    onTap = () => {},
    minZoom = 0.3,
    maxZoom = 5
  } = options;

  let isMultiTouch = false;
  let initialDistance = 0;
  let initialZoom = 1;
  let lastCenter = { x: 0, y: 0 };

  const handleTouchStart = (e) => {
    e.preventDefault();
    
    if (e.touches.length === 2) {
      isMultiTouch = true;
      initialDistance = getTouchDistance(e.touches[0], e.touches[1]);
      lastCenter = getTouchCenter(e.touches[0], e.touches[1]);
      initialZoom = options.currentZoom || 1;
    } else if (e.touches.length === 1) {
      isMultiTouch = false;
      const touch = e.touches[0];
      onTap({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    
    if (e.touches.length === 2 && isMultiTouch) {
      const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
      const currentCenter = getTouchCenter(e.touches[0], e.touches[1]);
      
      // Масштабирование
      if (initialDistance > 0) {
        const scaleChange = currentDistance / initialDistance;
        const newZoom = Math.max(minZoom, Math.min(maxZoom, initialZoom * scaleChange));
        onPinch(newZoom);
      }
      
      // Панорамирование
      const deltaX = currentCenter.x - lastCenter.x;
      const deltaY = currentCenter.y - lastCenter.y;
      onPan({ deltaX, deltaY });
      
      lastCenter = currentCenter;
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    
    if (e.touches.length === 0) {
      isMultiTouch = false;
      initialDistance = 0;
    }
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};