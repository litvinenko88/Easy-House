import { useEffect, useRef, useState } from "react";
import styles from "./Features.module.css";

const Features = () => {
  const containerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsExpanded(!isExpanded);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = containerRef.current?.querySelectorAll(
      `.${styles.featureItem}`
    );
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        const hiddenItems = containerRef.current?.querySelectorAll(
          `.${styles.hiddenItem}`
        );
        hiddenItems?.forEach((item, index) => {
          setTimeout(() => {
            item.style.display = 'block';
            item.classList.add(styles.visible);
          }, index * 100);
        });
      }, 50);
    }
  }, [isExpanded]);

  const features = [
    {
      id: 1,
      title: "Надежная защита и современный вид",
      description:
        "Прочная односкатная конструкция с мягкой кровлей обеспечивает абсолютную герметичность и отличную устойчивость к осадкам.",
      image: "/images/communications/1.webp",
    },
    {
      id: 2,
      title: "Прочность, которая не подведет",
      description:
        "Каркас из строганного бруса камерной сушки гарантирует идеальную геометрию, долговечность и устойчивость к деформации.",
      image: "/images/communications/2.webp",
    },
    {
      id: 3,
      title: "Тепло и тишина в любое время года",
      description:
        "Полный контур эффективной минераловатной изоляции для комфортного микроклимата зимой и летом, а также отличной шумоизоляции.",
      image: "/images/communications/3.webp",
    },
    {
      id: 4,
      title: "Готовое решение или свобода выбора",
      description:
        "Прочное и ровное основание из OSB с финишным покрытием или подготовкой под вашу отделку на выбор.",
      image: "/images/communications/4.webp",
    },
    {
      id: 5,
      title: "Уютная и экологичная атмосфера",
      description:
        "Отделка из натуральной сосны в ключевых помещениях создает здоровый микроклимат и неповторимую атмосферу тепла и уюта.",
      image: "/images/communications/5.webp",
    },
    {
      id: 6,
      title: "Стильный экстерьер и долговечность",
      description:
        "Эстетичная и практичная комбинация материалов: классическая красота дерева и современная надежность профлиста.",
      image: "/images/communications/6.webp",
    },
    {
      id: 7,
      title: "Прочное и проверенное основание",
      description:
        "Надежный свайный фундамент с обвязкой обеспечивает устойчивость дома на любом типе грунта без длительных подготовительных работ.",
      image: "/images/communications/7.webp",
    },
    {
      id: 8,
      title: "Тепло, свет и экономия",
      description:
        "Энергоэффективные трехкамерные окна сохраняют тепло, эффективно защищают от шума и позволяют экономить на отоплении.",
      image: "/images/communications/8.webp",
    },
    {
      id: 9,
      title: "Безопасность и защита от холода",
      description:
        "Прочная металлическая дверь с терморазрывом предотвращает появление наледи и сквозняков, надежно сохраняя тепло.",
      image: "/images/communications/9.webp",
    },
    {
      id: 10,
      title: "Горячая вода в любое время",
      description:
        "Вместительный накопительный бойлер обеспечит вас достаточным запасом горячей воды для всех ежедневных нужд.",
      image: "/images/communications/10.webp",
    },
    {
      id: 11,
      title: "Комфортное тепло в каждой комнате",
      description:
        "Современные и эффективные конвекторы быстро и равномерно прогревают весь объем помещения, создавая идеальный климат.",
      image: "/images/communications/11.webp",
    },
    {
      id: 12,
      title: "Полная готовность к комфортной жизни",
      description:
        "Комплект всей необходимой сантехники, электрика (от розеток до автоматики) для полноценного пользования сразу после заселения.",
      image: "/images/communications/12.webp",
    },
  ];

  return (
    <section className={styles.features} aria-labelledby="features-title">
      <div className={styles.container} ref={containerRef}>
        <header>
          <h2 id="features-title" className={styles.sectionTitle}>
            Что вы получаете при покупке модульного дома
          </h2>
        </header>
        
        <div className={`${styles.featuresGrid} ${isExpanded ? styles.expanded : styles.collapsed}`} id="features-grid" role="list" aria-label="Особенности модульных домов">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            const isHidden = index >= 4;

            return (
              <article
                key={feature.id}
                className={`${styles.featureItem} ${
                  isEven ? styles.right : styles.left
                } ${isHidden ? styles.hiddenItem : ''}`}
                style={{
                  display: !isExpanded && index >= 4 ? 'none' : 'block'
                }}
                role="listitem"
                itemScope
                itemType="https://schema.org/Product"
              >
                <div className={styles.stripe}>
                  <div className={styles.content}>
                    <div className={styles.imageContainer}>
                      <img
                        src={feature.image}
                        alt={`Особенность модульного дома: ${feature.title}`}
                        className={styles.image}
                        loading="lazy"
                        itemProp="image"
                      />
                    </div>
                    <div className={styles.textContent}>
                      <h3 className={styles.title} itemProp="name">{feature.title}</h3>
                      <p className={styles.description} itemProp="description">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        
        <div className={styles.expandButtonContainer}>
          <button 
            className={styles.expandButton}
            onClick={handleToggle}
            disabled={isAnimating}
            aria-expanded={isExpanded}
            aria-controls="features-grid"
            aria-label={isExpanded ? 'Свернуть список особенностей' : 'Развернуть полный список особенностей'}
          >
            {isExpanded ? 'Свернуть' : 'Развернуть'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;