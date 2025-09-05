import styles from './ProductSpecs.module.css';

export default function ProductSpecs({ specs }) {
  return (
    <section className={styles.specs}>
      <h2>Технические параметры</h2>
      <dl>
        <dt>Высота потолка:</dt>
        <dd>{specs?.ceiling || 'не указано'}</dd>
        <dt>Толщина стены:</dt>
        <dd>{specs?.wallThickness || 'не указано'}</dd>
        <dt>Утепление стены:</dt>
        <dd>{specs?.wallInsulation || 'не указано'}</dd>
        <dt>Толщина перегородки:</dt>
        <dd>{specs?.partitionThickness || 'не указано'}</dd>
        <dt>Утепление перегородки:</dt>
        <dd>{specs?.partitionInsulation || 'не указано'}</dd>
      </dl>
    </section>
  );
}