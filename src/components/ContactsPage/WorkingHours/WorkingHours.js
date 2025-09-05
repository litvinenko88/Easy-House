import { useState, useEffect } from 'react';
import styles from './WorkingHours.module.css';

const scheduleData = [
  {
    icon: '🏢',
    title: 'Офис',
    schedule: [
      'Пн-Пт: 9:00 - 18:00',
      'Сб: 10:00 - 16:00',
      'Вс: выходной'
    ]
  },
  {
    icon: '🏭',
    title: 'Производство',
    schedule: [
      'Пн-Пт: 8:00 - 17:00',
      'Сб-Вс: выходные',
      'Экскурсии по записи'
    ]
  },
  {
    icon: '💬',
    title: 'Консультации',
    schedule: [
      'Ежедневно: 8:00 - 22:00',
      'Телефон и WhatsApp',
      'Без выходных'
    ]
  }
];

export default function WorkingHours() {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.workingHours}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Режим работы</h2>
        
        <div className={styles.clockContainer}>
          <div className={styles.digitalClock}>
            <div className={styles.timeDisplay}>
              {currentTime ? currentTime.toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }) : '--:--'}
            </div>
            <div className={styles.dateDisplay}>
              {currentTime ? currentTime.toLocaleDateString('ru-RU', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              }) : 'Загрузка...'}
            </div>
          </div>
        </div>

        <div className={styles.hoursGrid}>
          {scheduleData.map((item, index) => (
            <div key={index} className={styles.hoursCard}>
              <div className={styles.hoursIcon}>{item.icon}</div>
              <h3 className={styles.hoursTitle}>{item.title}</h3>
              <div className={styles.hoursInfo}>
                {item.schedule.map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}