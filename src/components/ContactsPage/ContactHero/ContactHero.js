import { useState, useEffect } from 'react';
import styles from './ContactHero.module.css';

export default function ContactHero() {
  const [currentTime, setCurrentTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      const day = now.getDay();
      setIsOpen(hour >= 8 && hour < 20);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Контакты</h1>
          <p className={styles.subtitle}>
            Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы
          </p>
          <div className={styles.statusIndicator}>
            <div className={`${styles.statusDot} ${isOpen ? styles.open : styles.closed}`}></div>
            <span className={styles.statusText}>
              {isOpen ? 'Сейчас открыто' : 'Сейчас закрыто'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}