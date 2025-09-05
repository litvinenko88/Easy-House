import styles from './OrderButton.module.css';

export default function OrderButton({ onClick }) {
  return (
    <button 
      className={styles.orderButton}
      onClick={onClick}
    >
      Заказать
    </button>
  );
}