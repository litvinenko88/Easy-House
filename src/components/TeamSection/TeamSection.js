import { useState, useEffect, useRef } from 'react';
import styles from './TeamSection.module.css';

const teamMembers = [
  {
    name: "Владимир Бажанов",
    position: "Руководитель",
    photo: "/images/sotrudnik/1.jpg",
  },
  {
    name: "Анна Петрова",
    position: "Старший менеджер",
    photo: "/images/sotrudnik/2.jpg",
  },
  {
    name: "Михаил Сидоров",
    position: "Менеджер",
    photo: "/images/sotrudnik/3.jpg",
  },
  {
    name: "Елена Козлова",
    position: "Конструктор",
    photo: "/images/sotrudnik/4.jpg",
  },
  {
    name: "Дмитрий Волков",
    position: "Проектировщик",
    photo: "/images/sotrudnik/5.jpg",
  },
  {
    name: "Ольга Морозова",
    position: "Бухгалтер",
    photo: "/images/sotrudnik/6.jpg",
  },
  {
    name: "Сергей Иванов",
    position: "Сантехник",
    photo: "/images/sotrudnik/7.jpg",
  },
  {
    name: "Алексей Смирнов",
    position: "Электрик",
    photo: "/images/sotrudnik/8.jpg",
  },
  {
    name: "Николай Попов",
    position: "Сборщик",
    photo: "/images/sotrudnik/9.jpg",
  },
  {
    name: "Игорь Федоров",
    position: "Зав. складом",
    photo: "/images/sotrudnik/10.jpg",
  },
  {
    name: "Андрей Новиков",
    position: "Отделочник",
    photo: "/images/sotrudnik/11.jpg",
  },
  {
    name: "Павел Орлов",
    position: "Разнорабочий",
    photo: "/images/sotrudnik/12.jpg",
  },
  {
    name: "Виктор Лебедев",
    position: "Разнорабочий",
    photo: "/images/sotrudnik/13.jpg",
  },
];

export default function TeamSection({ title, subtitle }) {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              setIsVisible(true);
            } else {
              const cardIndex = parseInt(entry.target.dataset.cardIndex);
              setTimeout(() => {
                setVisibleCards(prev => new Set([...prev, cardIndex]));
              }, cardIndex * 100);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.teamSection} ref={sectionRef} aria-labelledby="team-title">
      <div className={styles.animatedBackground}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.pulseRing}></div>
      </div>

      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.headerVisible : ''}`}>
          <h2 id="team-title" className={styles.title}>
            {title || "Наша команда"}
          </h2>
          <p className={styles.subtitle}>
            {subtitle || "Профессионалы, которые воплощают ваши мечты в реальность"}
          </p>
        </div>

        <div className={styles.teamGrid} role="list" aria-label="Список сотрудников компании">
          {teamMembers.map((member, index) => (
            <article
              key={index}
              ref={el => cardsRef.current[index] = el}
              data-card-index={index}
              className={`${styles.teamCard} ${visibleCards.has(index) ? styles.cardVisible : ''}`}
              role="listitem"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className={styles.cardInner}>
                <div className={styles.photoContainer}>
                  <div className={styles.photoWrapper}>
                    <img
                      src={member.photo}
                      alt={`${member.name} - ${member.position} компании Easy House`}
                      className={styles.memberPhoto}
                      loading="lazy"
                      itemProp="image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={styles.photoPlaceholder} style={{ display: 'none' }}>
                      {member.name.charAt(0)}
                    </div>
                  </div>
                </div>
                
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName} itemProp="name">
                    {member.name}
                  </h3>
                  <p className={styles.memberPosition} itemProp="jobTitle">
                    {member.position}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}