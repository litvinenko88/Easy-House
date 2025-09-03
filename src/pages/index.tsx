import Layout from '../components/Layout/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout title="Easy House - Система управления умным домом" description="Современная система управления умным домом Easy House">
      <section className={styles.hero}>
        <div className={`${styles.container} container`}>
          <h1>Easy House</h1>
          <p>Система управления умным домом</p>
        </div>
      </section>
    </Layout>
  )
}