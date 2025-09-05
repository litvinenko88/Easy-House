import styles from './AboutStats.module.css';

export default function AboutStats() {
  const stats = [
    {
      number: "800+",
      label: "Реализованных проектов",
      description: "Успешно построенных домов по всей России"
    },
    {
      number: "12",
      label: "Домов в месяц",
      description: "Производственная мощность нашего завода"
    },
    {
      number: "30",
      label: "Дней до заезда",
      description: "От заказа до готового дома под ключ"
    },
    {
      number: "7",
      label: "Лет на рынке",
      description: "Опыт в производстве модульных домов"
    }
  ];

  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Easy House в цифрах</h2>
          <p className={styles.subtitle}>
            Наши достижения говорят сами за себя
          </p>
        </div>
        
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statDescription}>{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.background}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
      </div>
    </section>
  );
}