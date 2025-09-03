import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Easy House</div>
        <nav className={styles.nav}>
          <a href="/">Главная</a>
          <a href="/about">О нас</a>
          <a href="/contact">Контакты</a>
        </nav>
      </div>
    </header>
  )
}