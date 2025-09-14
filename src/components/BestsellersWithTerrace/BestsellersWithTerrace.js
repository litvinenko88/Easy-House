import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../Bestsellers/Bestsellers.module.css";

const housesWithTerraceData = [
  {
    id: 2,
    name: "Архангельск с террасой",
    area: "15 м² + терраса",
    feature: "Модульный дом с открытой террасой",
    price: "от 1 075 000 руб",
    description:
      "Уютный дом с готовой террасой для отдыха на свежем воздухе. Идеальное место для уютных посиделок.",
    image: "/images/Arkhangelsk_terrace/1.jpg",
    imageWebp: "/images/Arkhangelsk_terrace/1.jpg",
    slug: "arkhangelsk-s-terrasoj",
  },
  {
    id: 7,
    name: "Новый с палубой",
    area: "6×2,5 м + палуба",
    feature: "Модульный дом с палубой и перголой",
    price: "от 1 062 500 руб",
    description:
      "Современный дом с палубой и перголой для комфортного отдыха на природе.",
    image: "/images/New_House_with_Deck _and_Pergola/1.jpg",
    imageWebp: "/images/New_House_with_Deck _and_Pergola/1.jpg",
    slug: "novyj-s-paluboj",
  },
  {
    id: 8,
    name: "Барн с террасой",
    area: "30 м² + терраса",
    feature: "Просторный дом в стиле барн с террасой",
    price: "от 1 731 000 руб",
    description:
      "Просторный дом в стиле барн с террасой для большой семьи и комфортного отдыха.",
    image: "/images/Barn_with_terrace/1.jpg",
    imageWebp: "/images/Barn_with_terrace/1.jpg",
    slug: "barn-s-terrasoj",
  },
  {
    id: 11,
    name: "Угловой Архангельск с террасой",
    area: "21,5 м² + терраса",
    feature: "Угловая планировка с террасой",
    price: "от 1 345 500 руб",
    description:
      "Нестандартная угловая планировка с террасой для негабаритных участков.",
    image: "/images/Arkhangelsk_corner_with_terrace/1.jpg",
    imageWebp: "/images/Arkhangelsk_corner_with_terrace/1.jpg",
    slug: "uglovoj-arkhangelsk-s-terrasoj",
  },
];

export default function BestsellersWithTerrace({ title = "Готовые модульные дома и бани с террасой", subtitle = "Проверенные проекты и цены модульных домов, которые выбирают наши клиенты" }) {
  const [visibleCards, setVisibleCards] = useState([]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && sectionRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            housesWithTerraceData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            });
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const handleCardClick = (slug) => {
    if (typeof window !== "undefined" && slug) {
      router.push(`/catalog/${encodeURIComponent(slug)}`);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.bestsellers} ${isInView ? styles.inView : ""}`}
      itemScope
      itemType="https://schema.org/ItemList"
      aria-labelledby="bestsellers-title">
      <div className="container">
        <header className={styles.header}>
          <h2 id="bestsellers-title" className={styles.title} itemProp="name">
            {title}
          </h2>
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        </header>

        <div
          className={styles.grid}
          role="list"
          aria-label="Список модульных домов с террасой">
          {housesWithTerraceData.map((house, index) => (
            <article
              key={house.id}
              className={`${styles.card} ${
                visibleCards.includes(index) ? styles.visible : ""
              }`}
              itemScope
              itemType="https://schema.org/Product"
              role="listitem"
              tabIndex="0"
              onClick={() => handleCardClick(house.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(house.slug);
                }
              }}
              aria-label={`Модульный дом ${house.name}, площадь ${house.area}, цена ${house.price}`}>
              <div className={styles.imageContainer}>
                <picture>
                  <source srcSet={house.imageWebp} type="image/webp" />
                  <img
                    src={house.image}
                    alt={`Модульный дом ${house.name} - ${house.feature}`}
                    className={styles.image}
                    loading="lazy"
                    itemProp="image"
                  />
                </picture>
                <div className={styles.imageOverlay} aria-hidden="true">
                  <span className={styles.viewMore}>Подробнее</span>
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.contentTop}>
                  <header className={styles.cardHeader}>
                    <h3 className={styles.cardTitle} itemProp="name">
                      {house.name}
                    </h3>
                    <div
                      className={styles.area}
                      aria-label={`Площадь дома: ${house.area}`}>
                      <span className={styles.areaIcon} aria-hidden="true">
                        📐
                      </span>
                      <span itemProp="floorSize">{house.area}</span>
                    </div>
                  </header>

                  <div className={styles.feature} itemProp="description">
                    <span className={styles.featureLabel}>Особенность:</span>
                    <span className={styles.featureText}>
                      {house.feature}
                    </span>
                  </div>

                  <div
                    className={styles.price}
                    itemProp="offers"
                    itemScope
                    itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="RUB" />
                    <meta
                      itemProp="availability"
                      content="https://schema.org/InStock"
                    />
                    <span className={styles.priceLabel}>Цена:</span>
                    <span className={styles.priceValue} itemProp="price">
                      {house.price}
                    </span>
                  </div>

                  <p className={styles.description}>{house.description}</p>
                </div>

                <div className={styles.contentBottom}>
                  <button
                    className={styles.button}
                    type="button"
                    aria-label={`Подробнее о проекте дома ${house.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(house.slug);
                    }}>
                    <span>Подробнее о проекте</span>
                    <span className={styles.buttonIcon} aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.catalogButtonContainer}>
          <button
            className={styles.catalogButton}
            type="button"
            onClick={() => router.push("/catalog")}>
            Смотреть весь каталог
          </button>
        </div>
      </div>
    </section>
  );
}