import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import CatalogCard from "../components/CatalogCard/CatalogCard";
import styles from "./catalog.module.css";

const allHousesData = [
  {
    id: 1,
    name: "Новый Архангельск",
    area: "15-20 м²",
    feature: "Базовая модель одного модуля",
    price: "от 855 000 руб",
    description:
      "Компактный и функциональный модульный дом для быстрого старта строительства модульных домов. Всё необходимое для комфорта уже внутри, включая экологически чистые материалы.",
    image: "/images/New_Arkhangelsk/1.jpg",
    slug: "novyj-arkhangelsk",
  },
  {
    id: 2,
    name: "Архангельск с террасой",
    area: "15 м² + терраса",
    feature: "Модульный дом с открытой террасой",
    price: "от 1 075 000 руб",
    description:
      "Уютный дом с готовой террасой для отдыха на свежем воздухе. Идеальное место для утреннего кофе.",
    image: "/images/Arkhangelsk_terrace/1.jpg",
    slug: "arkhangelsk-s-terrasoj",
  },
  {
    id: 3,
    name: "Угловой Архангельск",
    area: "30 м² (6x5)",
    feature:
      "Угловая планировка, идеально подходящая для негабаритных участков",
    price: "от 1 265 000 руб",
    description:
      "Нестандартная планировка и больше полезного пространства в модели дома обеспечивают отличный выбор для семьи. Максимум возможностей на вашем участке с нашими домами и банями под ключ.",
    image: "/images/Angular_Arkhangelsk/1.jpg",
    slug: "uglovoj-arkhangelsk",
  },
  {
    id: 4,
    name: "Барн-хаус",
    area: "35-40 м²",
    feature: "Стиль Barnhouse",
    price: "от 930 000 руб",
    description:
      "Современный типовой каркасный дом в стиле барнхаус с высокими потолками. Для тех, кто ценит стиль, практичность и комфорт.",
    image: "/images/Barnhouse/1.jpg",
    slug: "barnkhaus",
  },
  {
    id: 5,
    name: "Двухмодульная Двинея",
    area: "30-40 м²",
    feature: "Просторная планировка с возможностью использования винтовых свай",
    price: "от 1 430 000 руб",
    description:
      "Просторная планировка с чётким зонированием, идеально подходящая для загородного дома для круглогодичного проживания, даже в сложных погодных условиях. Внутренняя и внешняя отделка гармонично сочетаются. Комфорт для всей семьи в одном модульном решении.",
    image: "/images/Two_module_Lane/1.jpg",
    slug: "dvukhmodulnaya-dvineya",
  },
  {
    id: 6,
    name: "Четырехмодульный Барн",
    area: "70-80 м²",
    feature: "Просторный дом для большой семьи",
    price: "от 3 130 000 руб",
    description:
      "Солидный дом с несколькими комнатами, доступный по выгодным ценам. Простор для жизни, работы и приёма гостей в модульных домах.",
    image: "/images/Four_Module_Barn/1.jpg",
    slug: "chetyrekhmodulnyj-barn",
  },
  {
    id: 7,
    name: "Новый",
    area: "15-20 м²",
    feature: "С палубой и перголой",
    price: "от 1 140 000 руб.",
    description:
      "Современный вариант бани с стильной и функциональной зоной отдыха на открытой палубе под перголой.",
    image: "/images/New_House_with_Deck _and_Pergola/1.jpg",
    slug: "novyj-s-paluboj",
  },
  {
    id: 8,
    name: "Барн с террасой",
    area: "30-40 м²",
    feature: "Барн-стиль с террасой",
    price: "от 1 790 000 руб.",
    description:
      "Вместительная баня в популярном стиле барн с большой открытой террасой для полноценного отдыха на природе.",
    image: "/images/Barn_with_terrace/1.jpg",
    slug: "barn-s-terrasoj",
  },
  {
    id: 9,
    name: "Барн",
    area: "30-40 м²",
    feature: "Стиль барнхаус, двускатная крыша, большая терраса из лиственницы",
    price: "от 1 290 000 руб.",
    description:
      "Современный дом в популярном стиле барнхаус с выразительной архитектурой и просторной террасой для отдыха на свежем воздухе. Идеальное сочетание эстетики и функциональности.",
    image: "/images/Barn_House/1.jpg",
    slug: "barn",
  },
  {
    id: 10,
    name: "Трехмодульный Барн",
    area: "50-60 м²",
    feature:
      "Трехмодульная конструкция, повышенная энергоэффективность, свободная планировка",
    price: "от 2 220 000 руб.",
    description:
      "Просторая и комфортабельная резиденция для жизни за городом. За счет трех модулей достигается уникальная планировка с выделенными зонами для отдыха, приема гостей и уединения.",
    image: "/images/Three_Module_Barn/1.jpg",
    slug: "trekhmodulnyj-barn",
  },
  {
    id: 11,
    name: "Угловой Архангельск с террасой",
    area: "20-30 м²",
    feature:
      "Угловая конструкция, эффективная планировка, уличная терраса с навесом",
    price: "от 1 145 500 руб.",
    description:
      "Компактная и очень практичная модель с нестандартной угловой планировкой, которая позволяет рационально использовать пространство. В комплекте — собственная терраса для комфортного отдыха.",
    image: "/images/Arkhangelsk_corner_with_terrace/1.jpg",
    slug: "uglovoj-arkhangelsk-s-terrasoj",
  },
];

export default function Catalog() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          allHousesData.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <Head>
        <title>
          Каталог модульных домов под ключ от 855 000 руб | Easy House
        </title>
        <meta
          name="description"
          content="Каталог модульных домов Easy House от 855 000 руб. 11 готовых проектов площадью от 15 до 80 м². Строительство под ключ с гарантией качества."
        />
        <meta
          name="keywords"
          content="каталог модульных домов, проекты домов, цены на модульные дома, готовые проекты, строительство под ключ, модульные дома цены, каркасные дома"
        />
        <link rel="canonical" href="https://house-modular.ru/catalog" />
        <meta
          property="og:title"
          content="Каталог модульных домов под ключ от 855 000 руб | Easy House"
        />
        <meta
          property="og:description"
          content="Каталог модульных домов Easy House от 855 000 руб. 11 готовых проектов площадью от 15 до 80 м². Строительство под ключ с гарантией качества."
        />
        <meta property="og:url" content="https://house-modular.ru/catalog" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://house-modular.ru/images/catalog-preview.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Каталог модульных домов Easy House"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Каталог модульных домов под ключ от 855 000 руб"
        />
        <meta
          name="twitter:description"
          content="Каталог модульных домов Easy House от 855 000 руб. 11 готовых проектов площадью от 15 до 80 м²."
        />
        <meta
          name="twitter:image"
          content="https://house-modular.ru/images/catalog-preview.jpg"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Каталог модульных домов Easy House",
            description:
              "Каталог готовых проектов модульных домов от 855 000 руб. Строительство под ключ.",
            url: "https://house-modular.ru/catalog",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: allHousesData.length,
              itemListElement: allHousesData.map((house, index) => ({
                "@type": "Product",
                position: index + 1,
                name: house.name,
                description: house.description,
                image: `https://house-modular.ru${house.image}`,
                offers: {
                  "@type": "Offer",
                  price: house.price?.replace(/[^0-9]/g, "") || "0",
                  priceCurrency: "RUB",
                  availability: "https://schema.org/InStock",
                },
              })),
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Главная",
                  item: "https://house-modular.ru/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Каталог",
                  item: "https://house-modular.ru/catalog",
                },
              ],
            },
          })}
        </script>
      </Head>

      <main>
        <Breadcrumbs />

        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>Каталог модульных домов</h1>
            <p className={styles.subtitle}>
              Выберите готовый проект из нашего каталога или создайте уникальный
              дом в конструкторе
            </p>
          </div>
        </section>

        <section
          ref={sectionRef}
          className={`${styles.catalog} ${isInView ? styles.inView : ""}`}
          itemScope
          itemType="https://schema.org/ItemList">
          <div className="container">
            <div
              className={styles.grid}
              role="list"
              aria-label="Список модульных домов">
              {allHousesData.map((house, index) => (
                <CatalogCard
                  key={house.id}
                  house={house}
                  index={index}
                  isVisible={visibleCards.includes(index)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
