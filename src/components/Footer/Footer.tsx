import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2024 Easy House. Все права защищены.</p>
      </div>
    </footer>
  )
}