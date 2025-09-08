import { useState, useEffect, useRef } from "react";
import styles from "./WhyChooseUs.module.css";
import ContactForm from "../ContactForm";

const WhyChooseUs = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  const advantages = [
    {
      id: 1,
      title: "Скорость возведения",
      description:
        "Полный цикл производства модульных домов от фундамента до сдачи ключей занимает 30 дней. Монтаж коробки на участке заказчика — всего 1-2 дня, что позволяет быстро начать проект модульного дома.",
      icon: "⚡",
      color: "#FF6B35",
    },
    {
      id: 2,
      title: "Фиксированная стоимость",
      description:
        "Цена модульного дома известна всегда заранее и не меняется в процессе строительства. Никаких сюрпризов и переплат.",
      icon: "💰",
      color: "#4ECDC4",
    },
    {
      id: 3,
      title: "Всесезонность строительства",
      description:
        "Дом можно собирать в любое время года, благодаря производству модулей в заводских условиях, которое не зависит от погоды и использует высококачественные материалы.",
      icon: "🌦️",
      color: "#45B7D1",
    },
    {
      id: 4,
      title: "Высокая энергоэффективность",
      description:
        "Многослойные утепленные панели и отсутствие щелей экономят до 50% на отоплении зимой и кондиционировании летом. Все расходы на отопление заранее известны.",
      icon: "🔥",
      color: "#96CEB4",
    },
    {
      id: 5,
      title: "Заводское качество",
      description:
        "Все элементы производятся на высокоточном оборудовании в контролируемых условиях, что исключает брак и человеческий фактор.",
      icon: "⚙️",
      color: "#FFEAA7",
    },
    {
      id: 6,
      title: "Прочность и долговечность",
      description:
        "Каркас из сухой древесины и двутавровых балок не дает усадки, не деформируется и служит десятилетиями. Что делает модульные дома для круглогодичного проживания ничем не хуже кирпичных ",
      icon: "🏠",
      color: "#DDA0DD",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.itemId);
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, itemId]));
            }, itemId * 150);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isContactFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isContactFormOpen]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Причины выбрать модульный дом</h2>
          <p className={styles.subtitle}>
            Технология производства модульных домов - это принципиально новый
            уровень комфорта, надежности и экономии
          </p>
        </div>

        <div className={styles.advantagesGrid}>
          {advantages.map((advantage, index) => (
            <div
              key={advantage.id}
              ref={(el) => (itemsRef.current[index] = el)}
              data-item-id={advantage.id}
              className={`${styles.advantageCard} ${
                visibleItems.has(advantage.id) ? styles.visible : ""
              }`}
              style={{ "--accent-color": advantage.color }}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{advantage.icon}</span>
                  <div className={styles.iconBg}></div>
                </div>
                <div className={styles.textContent}>
                  <h3 className={styles.cardTitle}>{advantage.title}</h3>
                  <p className={styles.cardDescription}>
                    {advantage.description}
                  </p>
                </div>
              </div>
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>Готовы начать строительство?</h3>
            <p className={styles.ctaText}>
              Получите персональный расчет стоимости вашего модульного дома
            </p>
            <button
              className={styles.ctaButton}
              onClick={() => setIsContactFormOpen(true)}>
              <span>Рассчитать стоимость</span>
              <div className={styles.buttonGlow}></div>
            </button>
          </div>
        </div>
      </div>

      {isContactFormOpen && (
        <div
          className={styles.modal}
          onClick={() => setIsContactFormOpen(false)}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setIsContactFormOpen(false)}
              aria-label="Закрыть форму">
              ×
            </button>
            <ContactForm
              title="Рассчитать стоимость"
              source="блок преимуществ - кнопка рассчитать стоимость"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyChooseUs;
