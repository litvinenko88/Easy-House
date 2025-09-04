import { useRouter } from "next/router";
import styles from "./CatalogCard.module.css";

const CatalogCard = ({ house, index, isVisible, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (house.slug) {
      const sanitizedSlug = house.slug.replace(/[^a-zA-Z0-9-_]/g, '');
      router.push(`/catalog/${encodeURIComponent(sanitizedSlug)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className={`${styles.card} ${isVisible ? styles.visible : ""}`}
      itemScope
      itemType="https://schema.org/Product"
      role="listitem"
      tabIndex="0"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Модульный дом ${house.name}, площадь ${house.area}, цена ${house.price}`}
    >
      <div className={styles.imageContainer}>
        <picture>
          <img
            src={house.image}
            alt={`Модульный дом ${house.name} площадью ${house.area} - ${house.feature}. Цена ${house.price}`}
            width="400"
            height="300"
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
        <header className={styles.cardHeader}>
          <h3 className={styles.cardTitle} itemProp="name">
            {house.name}
          </h3>
          <div
            className={styles.area}
            aria-label={`Площадь дома: ${house.area}`}
          >
            <span className={styles.areaIcon} aria-hidden="true">
              📐
            </span>
            <span itemProp="floorSize">{house.area}</span>
          </div>
        </header>

        <div className={styles.feature} itemProp="description">
          <span className={styles.featureLabel}>Особенность:</span>
          <span className={styles.featureText}>{house.feature}</span>
        </div>

        <div
          className={styles.price}
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
        >
          <meta itemProp="priceCurrency" content="RUB" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
          <span className={styles.priceLabel}>Цена:</span>
          <span className={styles.priceValue} itemProp="price">
            {house.price}
          </span>
        </div>

        <p className={styles.description}>{house.description}</p>

        <button
          className={styles.button}
          type="button"
          aria-label={`Подробнее о проекте дома ${house.name}`}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <span>Подробнее</span>
          <span className={styles.buttonIcon} aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </article>
  );
};

export default CatalogCard;