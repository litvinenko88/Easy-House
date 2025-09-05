import styles from './ConstructorLoading.module.css';

export default function ConstructorLoading() {
  return (
    <div className={styles.constructorLoading}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>
        Загрузка конструктора...
      </p>
    </div>
  );
}