import styles from './AboutContent.module.css';

export default function AboutContent() {
  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textBlock}>
            <h2 className={styles.sectionTitle}>Наша история</h2>
            <div className={styles.text}>
              <p>
                Наша компания уже более 7 лет создает современные и доступные
                модульные дома для жизни для людей по всей России. Мы начали с
                небольшой мастерской, а сегодня — это современное производство
                с немецким оборудованием, которое позволяет выпускать до 12
                домокомплектов в месяц.
              </p>
              <p>
                Наш секрет успеха прост: мы не просто продаем дома, мы
                предлагаем комплексное решение «под ключ». От проектирования и
                производства до монтажа и отделки — все этапы мы контролируем
                сами.
              </p>
            </div>
          </div>
          
          <div className={styles.imageBlock}>
            <img 
              src="/images/production-facility.jpg" 
              alt="Производственный цех Easy House"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.imageBlock}>
            <img 
              src="/images/quality-materials.jpg" 
              alt="Качественные материалы для строительства"
              className={styles.image}
            />
          </div>
          
          <div className={styles.textBlock}>
            <h2 className={styles.sectionTitle}>Качество материалов</h2>
            <div className={styles.text}>
              <p>
                Мы используем только проверенные материалы: каркас из сухой
                строганной древесины, экологичный утеплитель Rockwool,
                пожаробезопасные ГСП-плиты. Каждый наш дом — это результат
                точной работы инженеров и современных технологий.
              </p>
              <p>
                Это позволяет гарантировать высочайшее качество,
                соблюдать сроки и удерживать честные цены без посредников.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.fullWidthBlock}>
          <h2 className={styles.sectionTitle}>Наши преимущества</h2>
          <div className={styles.advantagesGrid}>
            <div className={styles.advantage}>
              <div className={styles.advantageIcon}>🏭</div>
              <h3 className={styles.advantageTitle}>Собственное производство</h3>
              <p className={styles.advantageText}>
                Современное производство с немецким оборудованием Weinmann
              </p>
            </div>
            
            <div className={styles.advantage}>
              <div className={styles.advantageIcon}>⚡</div>
              <h3 className={styles.advantageTitle}>Быстрые сроки</h3>
              <p className={styles.advantageText}>
                От заказа до заезда — всего 30 дней
              </p>
            </div>
            
            <div className={styles.advantage}>
              <div className={styles.advantageIcon}>🛡️</div>
              <h3 className={styles.advantageTitle}>Гарантия 5 лет</h3>
              <p className={styles.advantageText}>
                Прозрачный договор и долгосрочная гарантия качества
              </p>
            </div>
            
            <div className={styles.advantage}>
              <div className={styles.advantageIcon}>💰</div>
              <h3 className={styles.advantageTitle}>Честные цены</h3>
              <p className={styles.advantageText}>
                Работаем без посредников, цена от производителя
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}