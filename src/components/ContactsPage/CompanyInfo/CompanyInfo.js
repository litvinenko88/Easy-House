import styles from './CompanyInfo.module.css';

const companyData = [
  {
    title: 'Основная информация',
    content: [
      { label: 'Название организации', value: 'ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ БАЖАНОВ ВЛАДИМИР АЛЕКСАНДРОВИЧ' },
      { label: 'ИНН', value: '263411519024' },
      { label: 'ОГРНИП', value: '322265100067452' }
    ]
  },
  {
    title: 'Юридический адрес',
    content: [
      { value: '355013, РОССИЯ, СТАВРОПОЛЬСКИЙ КРАЙ, Г СТАВРОПОЛЬ, УЛ СЕВРЮКОВА, Д 94' }
    ]
  },
  {
    title: 'Банковские реквизиты',
    content: [
      { label: 'Расчетный счет', value: '40802810400003407449' },
      { label: 'Банк', value: 'АО «ТБанк»' },
      { label: 'ИНН банка', value: '7710140679' },
      { label: 'БИК', value: '044525974' },
      { label: 'Корр. счет', value: '30101810145250000974' }
    ]
  },
  {
    title: 'Адрес банка',
    content: [
      { value: '127287, г. Москва, ул. Хуторская 2-я, д. 38А, стр. 26' }
    ]
  }
];

export default function CompanyInfo() {
  return (
    <section className={styles.companyInfo}>
      <div className={styles.container}>
        <h2 className={styles.title}>Реквизиты компании</h2>
        <div className={styles.infoGrid}>
          {companyData.map((section, index) => (
            <div key={index} className={styles.infoCard}>
              <h3 className={styles.cardTitle}>{section.title}</h3>
              <div className={styles.infoText}>
                {section.content.map((item, itemIndex) => (
                  <p key={itemIndex}>
                    {item.label && <strong>{item.label}:</strong>}
                    {item.label ? ` ${item.value}` : item.value}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}