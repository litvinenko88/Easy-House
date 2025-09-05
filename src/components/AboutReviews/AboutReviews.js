import Link from 'next/link';
import styles from './AboutReviews.module.css';

export default function AboutReviews() {
  const reviews = [
    {
      video: "/videos/otz1.mp4",
      poster: "/images/review1-poster.jpg"
    },
    {
      video: "/videos/otz2.mp4", 
      poster: "/images/review2-poster.jpg"
    },
    {
      video: "/videos/otz3.mp4",
      poster: "/images/review3-poster.jpg"
    },
    {
      video: "/videos/otz4.mp4",
      poster: "/images/review4-poster.jpg"
    }
  ];

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Что говорят наши клиенты</h2>
          <p className={styles.subtitle}>
            Честные отзывы людей, которые уже живут в наших домах
          </p>
        </div>
        
        <div className={styles.videosGrid}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.videoCard}>
              <video 
                className={styles.video} 
                controls 
                preload="metadata"
                poster={review.poster}
              >
                <source src={review.video} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
          ))}
        </div>
        
        <div className={styles.cta}>
          <Link href="/otzyvy" className={styles.ctaButton}>
            Смотреть все отзывы
          </Link>
        </div>
      </div>
      
      <div className={styles.backgroundElements}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
    </section>
  );
}