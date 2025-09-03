import Layout from '../components/Layout/Layout'
import styles from '../styles/Contact.module.css'

export default function Contact() {
  return (
    <Layout title="Контакты - Easy House" description="Свяжитесь с нами для получения информации о системе Easy House">
      <section className={styles.contact}>
        <div className={styles.container}>
          <h1>Контакты</h1>
          <p>Свяжитесь с нами</p>
        </div>
      </section>
    </Layout>
  )
}