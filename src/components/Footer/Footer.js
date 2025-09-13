import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.querySelector(`.${styles.footer}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.grid}>
            <div className={styles.company}>
              <div className={styles.logo}>Easy House</div>
              <p className={styles.description}>
                Строительство модульных домов под ключ за 30 дней. Качество,
                надежность и комфорт для вашей семьи.
              </p>
              <div className={styles.contacts}>
                <a href="tel:+79964179001" className={styles.phone}>
                  +7 (996) 417-90-01
                </a>
              </div>
            </div>

            <div className={styles.links}>
              <div className={styles.title}>Модульные дома</div>
              <ul className={styles.linksList}>
                <li>
                  <Link href="/bystrovozvodimyye-modulnyye-doma">
                    Быстровозводимые
                  </Link>
                </li>
                <li>
                  <Link href="/modulnyye-doma-dlya-prozhivaniya">
                    Для проживания
                  </Link>
                </li>
                <li>
                  <Link href="/modulnyye-doma-dlya-baz-otdykha">
                    Для баз отдыха и глэмпинга
                  </Link>
                </li>
                <li>
                  <Link href="/modulnyye-gostinitsy">Для гостиниц</Link>
                </li>
                <li>
                  <Link href="/modulnyye-doma-s-terrasoy">С террасой</Link>
                </li>
              </ul>
            </div>

            <div className={styles.links}>
              <div className={styles.title}>Регионы</div>
              <ul className={styles.linksList}>
                <li>
                  <Link href="/stavropolskiy-kray">Ставропольский край</Link>
                </li>
                <li>
                  <Link href="/krasnodarskiy-kray">Краснодарский край</Link>
                </li>
                <li>
                  <Link href="/respublika-kchr">Республика КЧР</Link>
                </li>
                <li>
                  <Link href="/respublika-kbr">Республика КБР</Link>
                </li>
              </ul>
            </div>

            <div className={styles.links}>
              <div className={styles.title}>Компания</div>
              <ul className={styles.linksList}>
                <li>
                  <Link href="/o-kompanii">О компании</Link>
                </li>
                <li>
                  <Link href="/otzyvy">Отзывы</Link>
                </li>
                <li>
                  <Link href="/contacts">Контакты</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles.copyright}>
              © 2025 Easy House. Все права защищены.
            </div>
            <div className={styles.legal}>
              <Link href="/politika-konfidentsialnosti">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
