'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './House3DViewer.module.css';

export default function House3DViewer({ 
  elements, 
  walls, 
  doors, 
  windows, 
  initialData,
  onClose 
}) {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки 3D модели
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.house3DViewer}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка 3D модели...</p>
        </div>
      )}
      
      <div className={styles.viewerControls}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕ Закрыть 3D
        </button>
        <div className={styles.controlsInfo}>
          <span>🖱️ Перетаскивайте для поворота</span>
          <span>🔍 Колесо мыши для масштаба</span>
        </div>
      </div>
      
      <div ref={mountRef} className={styles.viewerContainer}>
        {!isLoading && (
          <div className={styles.placeholder3D}>
            <div className={styles.houseModel}>
              <div className={styles.houseBase}></div>
              <div className={styles.houseRoof}></div>
              <div className={styles.houseDoor}></div>
              <div className={styles.houseWindow}></div>
              <div className={styles.houseWindow} style={{right: '20px'}}></div>
            </div>
            <p>3D модель дома {initialData.house.width}×{initialData.house.height}м</p>
          </div>
        )}
      </div>
    </div>
  );
}