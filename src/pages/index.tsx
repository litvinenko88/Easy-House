import Layout from '../components/Layout/Layout'
import Button from '../components/Button/Button'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout title="Easy House - Система управления умным домом" description="Современная система управления умным домом Easy House">
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Easy House</h1>
          <p>Система управления умным домом</p>
          <Button>Узнать больше</Button>
        </div>
      </section>
    </Layout>
  )
}