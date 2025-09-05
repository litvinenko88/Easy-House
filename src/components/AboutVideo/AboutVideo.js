import styles from './AboutVideo.module.css';

export default function AboutVideo() {
  return (
    <section className={styles.videoSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Как мы производим ваши дома</h2>
            <p className={styles.description}>
              Посмотрите, как работает наше современное производство с немецким 
              оборудованием. Каждый этап контролируется нашими специалистами 
              для обеспечения максимального качества.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🏭</span>
                <span className={styles.featureText}>Немецкое оборудование Weinmann</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🔧</span>
                <span className={styles.featureText}>Точность до миллиметра</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✅</span>
                <span className={styles.featureText}>Контроль качества на каждом этапе</span>
              </div>
            </div>
          </div>
          
          <div className={styles.videoContainer}>
            <video 
              className={styles.video} 
              controls 
              preload="metadata"
              poster="/images/production-video-poster.jpg"
            >
              <source src="/videos/proizvodstvo.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            <div className={styles.playButton}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)"/>
                <path d="M25 20L40 30L25 40V20Z" fill="var(--color-accent)"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}