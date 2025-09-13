import { useState, useEffect } from 'react'
import styles from './Hero.module.css'


export default function Hero({ title, titleSub, price, subtitle, advantages }) {
  const [isVisible, setIsVisible] = useState(false)


  useEffect(() => {
    setIsVisible(true)
  }, [])





  return (
    <section className={styles.hero} role="banner" aria-label="Главная секция с информацией о модульных домах">
      <div className={styles.animatedBackground}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.pulseRing}></div>
        <div className={styles.pulseRing}></div>
      </div>
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.leftSection}>
            <h1 className={styles.title} itemScope itemType="https://schema.org/Product">
              <span className={styles.titleMain} itemProp="name">{title}</span>
              <span className={styles.titleSub}>{titleSub} </span>
              <span className={styles.price} itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="price" content="855000" />
                <meta itemProp="priceCurrency" content="RUB" />
                <meta itemProp="availability" content="https://schema.org/InStock" />
                {price}
              </span>
            </h1>
            
            <p className={styles.subtitle} itemProp="description">
              {subtitle}
            </p>
            
            <ul className={styles.advantages} role="list" aria-label="Преимущества модульных домов">
              {advantages.map((advantage, index) => {
                const icons = ['🏠', '🔧', '💰', '⚡'];
                return (
                  <li key={index} className={styles.advantage}>
                    <div className={styles.advantageIcon} role="img" aria-label={`Иконка ${index + 1}`}>{icons[index] || '✓'}</div>
                    <span className={styles.advantageText}>{advantage}</span>
                  </li>
                );
              })}
            </ul>
            
            <div className={styles.buttons} role="group" aria-label="Действия">
              <button 
                className={`${styles.btn} ${styles.btnPrimary}`} 
                type="button" 

                aria-label="Рассчитать стоимость модульного дома"
              >
                Рассчитать стоимость
              </button>
              <a href="/catalog" className={`${styles.btn} ${styles.btnSecondary}`} aria-label="Посмотреть каталог модульных домов">
                Посмотреть каталог
              </a>
            </div>
          </div>
          
          <div className={styles.rightSection}>
            <div className={styles.videoContainer}>
              <video 
                className={styles.video}
                autoPlay 
                muted 
                loop 
                playsInline
                aria-label="Демонстрационное видео модульных домов Easy House"
                title="Модульные дома Easy House - строительство под ключ"
              >
                <source src="/videos/glav2308.mp4" type="video/mp4" />
                <track kind="captions" srcLang="ru" label="Русские субтитры" />
                Ваш браузер не поддерживает видео. Посмотрите наши модульные дома на фотографиях в каталоге.
              </video>
              <div className={styles.videoOverlay} aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}