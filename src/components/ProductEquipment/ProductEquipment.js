import styles from './ProductEquipment.module.css';

export default function ProductEquipment({ equipment }) {
  return (
    <section className={styles.equipment}>
      <h3>Базовая комплектация</h3>
      <ul>
        {equipment?.map((item, index) => (
          <li key={index}>{item}</li>
        )) || []}
      </ul>
    </section>
  );
}