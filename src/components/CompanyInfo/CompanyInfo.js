import styles from './CompanyInfo.module.css';

export default function CompanyInfo() {
  return (
    <section className={styles.companyInfo}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Реквизиты компании</h2>
          <p className={styles.subtitle}>
            Вся необходимая информация для заключения договора
          </p>
        </div>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.cardIcon}>🏢</div>
            <h3 className={styles.cardTitle}>Организация</h3>
            <div className={styles.cardContent}>
              <p className={styles.companyName}>
                ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ<br />
                БАЖАНОВ ВЛАДИМИР АЛЕКСАНДРОВИЧ
              </p>
              <div className={styles.details}>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>ИНН:</span>
                  <span className={styles.detailValue}>263411519024</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>ОГРНИП:</span>
                  <span className={styles.detailValue}>322265100067452</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardIcon}>📍</div>
            <h3 className={styles.cardTitle}>Юридический адрес</h3>
            <div className={styles.cardContent}>
              <p className={styles.address}>
                355013, РОССИЯ, СТАВРОПОЛЬСКИЙ КРАЙ,<br />
                Г СТАВРОПОЛЬ, УЛ СЕВРЮКОВА, Д 94
              </p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardIcon}>🏦</div>
            <h3 className={styles.cardTitle}>Банковские реквизиты</h3>
            <div className={styles.cardContent}>
              <div className={styles.details}>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Расчетный счет:</span>
                  <span className={styles.detailValue}>40802810400003407449</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Банк:</span>
                  <span className={styles.detailValue}>АО «ТБанк»</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>БИК:</span>
                  <span className={styles.detailValue}>044525974</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Корр. счет:</span>
                  <span className={styles.detailValue}>30101810145250000974</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.trustBadges}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>✅</span>
            <span className={styles.badgeText}>Официальная регистрация</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🛡️</span>
            <span className={styles.badgeText}>Прозрачные договоры</span>
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>📋</span>
            <span className={styles.badgeText}>Полная отчетность</span>
          </div>
        </div>
      </div>
    </section>
  );
}