import { useState, useEffect, useRef } from 'react';
import styles from './ProjectConstructor.module.css';

const ProjectConstructor = ({ title, subtitle, description, onConstructorOpen = () => {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.animatedBackground}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.pulseRing}></div>
      </div>
      
      <div className={styles.backgroundImage}></div>
      
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            {title || "Не нашли нужную планировку?"}
          </h2>
          <p className={styles.subtitle}>
            {subtitle || "Спроектируйте идеальный план сами"}
          </p>
          <p className={styles.description}>
            {description || "Всего за несколько минут - и готовый 3D-тур по вашей будущему дому"}
          </p>
          
          <button 
            className={styles.constructorButton} 
            onClick={() => window.open('/konstruktor', '_blank', 'noopener,noreferrer')}
          >
            Перейти в конструктор
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectConstructor;