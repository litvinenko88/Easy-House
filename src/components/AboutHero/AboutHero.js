import styles from './AboutHero.module.css';

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>О компании Easy House</h1>
          <p className={styles.subtitle}>
            7 лет создаем качественные модульные дома для комфортной жизни
          </p>
          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <span className={styles.number}>800+</span>
              <span className={styles.label}>Реализованных проектов</span>
            </div>
            <div className={styles.highlight}>
              <span className={styles.number}>7</span>
              <span className={styles.label}>Лет опыта</span>
            </div>
            <div className={styles.highlight}>
              <span className={styles.number}>5</span>
              <span className={styles.label}>Лет гарантии</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.decorativeElements}>
        <div className={styles.circle}></div>
        <div className={styles.gradient}></div>
      </div>
    </section>
  );
}