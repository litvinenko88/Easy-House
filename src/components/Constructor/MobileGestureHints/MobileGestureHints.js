import { useState, useEffect } from 'react';
import styles from './MobileGestureHints.module.css';

const MobileGestureHints = ({ isVisible, onClose }) => {
  const [currentHint, setCurrentHint] = useState(0);
  
  const hints = [
    {
      icon: '👆',
      title: 'Навигация',
      description: 'Используйте один палец для перемещения по плану'
    },
    {
      icon: '🤏',
      title: 'Масштабирование',
      description: 'Сведите или разведите два пальца для изменения масштаба'
    },
    {
      icon: '🏠',
      title: 'Выбор элементов',
      description: 'Коснитесь элемента для его выбора и редактирования'
    },
    {
      icon: '🔧',
      title: 'Инструменты',
      description: 'Выберите инструмент в нижней панели для добавления стен, дверей и окон'
    }
  ];

  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setInterval(() => {
      setCurrentHint(prev => (prev + 1) % hints.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [isVisible, hints.length]);

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.hintContainer}>
        <div className={styles.hintContent}>
          <div className={styles.hintIcon}>
            {hints[currentHint].icon}
          </div>
          <h3 className={styles.hintTitle}>
            {hints[currentHint].title}
          </h3>
          <p className={styles.hintDescription}>
            {hints[currentHint].description}
          </p>
        </div>
        
        <div className={styles.hintIndicators}>
          {hints.map((_, index) => (
            <div
              key={index}
              className={`${styles.indicator} ${index === currentHint ? styles.active : ''}`}
              onClick={() => setCurrentHint(index)}
            />
          ))}
        </div>
        
        <button className={styles.closeButton} onClick={onClose}>
          Понятно
        </button>
      </div>
    </div>
  );
};

export default MobileGestureHints;