import { useMemo } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import Features from "../components/Features";
import VirtualTour from "../components/VirtualTour";
import ProductionProcess from "../components/ProductionProcess";
import ProjectConstructor from "../components/ProjectConstructor";
import WhyChooseUs from "../components/WhyChooseUs";
import Guarantees from "../components/Guarantees";

// Динамический импорт для оптимизации производительности
const VideoReviews = dynamic(() => import("../components/VideoReviews"), {
  loading: () => <div>Загрузка...</div>,
});
const PhotoGallery = dynamic(() => import("../components/PhotoGallery"), {
  loading: () => <div>Загрузка галереи...</div>,
});
const DeliveryInstallation = dynamic(
  () => import("../components/DeliveryInstallation"),
  {
    loading: () => <div>Загрузка...</div>,
  }
);

export default function DachniyModulniyDom() {
  // Мемоизация структурированных данных для производительности
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://house-modular.ru/dachniy-modulniy-dom#business",
      name: "House Modular - Дачный модульный дом",
      description:
        "Дачный модульный дом под ключ для сезонного и круглогодичного проживания. Собственное производство модульных домов с быстровозводимой технологией.",
      url: "https://house-modular.ru/dachniy-modulniy-dom",
      telephone: "+7 (996) 417-90-01",
      priceRange: "от 650,000 ₽",
      address: {
        "@type": "PostalAddress",
        addressCountry: "RU",
        addressRegion: "Россия",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "55.7558",
        longitude: "37.6176",
      },
      openingHours: "Mo-Su 09:00-21:00",
      serviceArea: [
        {
          "@type": "State",
          name: "Ставропольский край",
        },
        {
          "@type": "State",
          name: "Краснодарский край",
        },
        {
          "@type": "State",
          name: "Республика КЧР",
        },
        {
          "@type": "State",
          name: "Республика КБР",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Каталог дачных модульных домов",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Дачный модульный дом",
              description:
                "Готовый дачный модульный дом под ключ для сезонного и круглогодичного проживания",
              url: "https://house-modular.ru/dachniy-modulniy-dom/",
              offers: {
                "@type": "Offer",
                price: "650000",
                priceCurrency: "RUB",
                availability: "https://schema.org/InStock",
              },
            },
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "156",
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: [
        "https://vk.com/easy_house_ru",
        "https://t.me/easy_house_ru",
        "https://wa.me/79964179001",
      ],
      potentialAction: {
        "@type": "OrderAction",
        target: "https://house-modular.ru/konstruktor/",
        name: "Заказать дачный модульный дом",
      },
    }),
    []
  );

  // FAQ Schema для расширенных сниппетов
  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Сколько стоит дачный модульный дом?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Стоимость дачного модульного дома от 650 000 рублей под ключ с полной отделкой и коммуникациями.",
          },
        },
        {
          "@type": "Question",
          name: "Подходит ли дачный дом для круглогодичного проживания?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, наши дачные модульные дома подходят как для сезонного, так и для круглогодичного проживания благодаря качественному утеплению.",
          },
        },
      ],
    }),
    []
  );

  // Product Schema для товарной разметки
  const productSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Дачный модульный дом",
      brand: {
        "@type": "Brand",
        name: "House Modular",
      },
      category: "Модульные дома",
      image: "https://house-modular.ru/images/dacha-house.jpg",
      offers: {
        "@type": "Offer",
        price: "650000",
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        priceValidUntil: "2024-12-31",
        seller: {
          "@type": "Organization",
          name: "House Modular",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "156",
      },
    }),
    []
  );

  // Breadcrumbs Schema
  const breadcrumbSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
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
          name: "Дачный модульный дом",
          item: "https://house-modular.ru/dachniy-modulniy-dom",
        },
      ],
    }),
    []
  );

  return (
    <>
      <Head>
        {/* Основные мета-теги для индексации */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="yandex" content="index, follow" />

        {/* Мобильная оптимизация */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=yes" />

        {/* Open Graph для социальных сетей */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="House Modular" />
        <meta property="og:locale" content="ru_RU" />
        <meta
          property="og:image"
          content="https://house-modular.ru/images/dacha-house-og.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Дачный модульный дом" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@house_modular" />
        <meta
          name="twitter:image"
          content="https://house-modular.ru/images/dacha-house-og.jpg"
        />

        {/* Дополнительные мета-теги */}
        <meta name="author" content="House Modular" />
        <meta name="publisher" content="House Modular" />
        <meta name="copyright" content="House Modular" />
        <meta name="language" content="ru" />
        <meta name="geo.region" content="RU" />
        <meta name="geo.placename" content="Россия" />

        {/* Безопасность */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />

        {/* Производительность */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Структурированные данные */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>
      <Layout
        title="Дачный модульный дом под ключ - готовые проекты и цены"
        description="Дачный модульный дом под ключ для сезонного и круглогодичного проживания. Собственное производство модульных домов. Быстровозводимые дома с гарантией качества. Строительство за 30 дней. Получите готовый дом под ключ в кратчайшие сроки!"
        keywords="дачный модульный дом, дом для дачи, модульный дом под ключ, дачный дом цена, купить дачный дом, быстровозводимый дачный дом, модульные дома для дачи, строительство дачных домов, готовые дачные дома, производство модульных домов">
        <Hero
          title={
            <>
              Дачный модульный дом под ключ{" "}
              <span style={{ color: "#ff6b35" }}>
                для комфортного отдыха на природе
              </span>{" "}
            </>
          }
          subtitle="Идеальное решение для дачи - модульный дом с полной отделкой"
          advantages={[
            "Готов к заселению",
            "Строительство за 30 дней",
            "Фиксированная цена",
            "Гарантия 5 лет",
          ]}
        />
        <ProblemSolution
          title={
            <>
              Нужен дом для дачи, но не знаете с чего начать?{" "}
              <span style={{ color: "#ff6b35" }}>
                Мы решили эту проблему
              </span>
            </>
          }
          problemTitle="Обычное строительство дачи"
          solutionTitle="Дачный модульный дом"
          problems={[
            "Долгое строительство",
            "Непредсказуемые расходы",
            "Поиск строителей",
            "Контроль качества работ",
          ]}
          solutions={[
            "Готовый дом за 1-2 дня",
            "Честная цена без доплат",
            "Всё включено под ключ",
            "Заводское качество",
          ]}
          subtitle="Начните отдыхать на даче уже через месяц"
        />
        <Bestsellers
          title="Популярные проекты дачных модульных домов"
          subtitle="Проверенные проекты и цены дачных домов, которые выбирают наши клиенты"
        />
        <VideoReviews
          title="Видеообзоры наших дачных домов"
          description="Посмотрите, как выглядят готовые дачные модульные дома изнутри и снаружи"
        />
        <Features title="Комплектация дачного дома" />
        <VirtualTour
          title="3D-тур по дачному модульному дому"
          description="Хотите заранее увидеть свой будущий дачный дом? Изучите готовые проекты в интерактивной 3D-экскурсии. Оцените планировку, расстановку мебели и представьте отдых в новом доме - ещё до начала строительства."
        />
        <ProductionProcess
          title="Производство дачных модульных домов: качество на каждом этапе"
          subtitle="От проекта до готового дома: современная технология для вашего комфорта."
          description="Наше производство дачных модульных домов под ключ исключает ошибки и гарантирует высочайшее качество. Строим дома на заводе, используя современное оборудование и отборные материалы."
          guarantee="Этот подход гарантирует, что ваш дачный дом будет теплым, уютным и готовым к комфортному отдыху"
        />
        <ProjectConstructor
          title="Готовые проекты не подошли?"
          subtitle="Создайте индивидуальный проект дачного дома"
          description="Разработайте уникальный проект всего за несколько минут и получите готовый 3D-тур по вашему будущему дачному дому"
        />
        <WhyChooseUs
          title="Преимущества дачных модульных домов"
          subtitle="Технология строительства модульных домов - это принципиально новый уровень комфорта и экономии для вашей дачи"
          ctaTitle="Готовы заказать дачный дом?"
          ctaText="Получите расчет стоимости вашего дачного модульного дома"
        />
        <Guarantees
          title="Гарантия на дачный модульный дом"
          subtitle="Строительство дачного дома - ответственный шаг. Наша работа прозрачна и защищена юридически"
          footerText="С нами вы можете быть спокойны: ваш дачный дом будет построен в срок, за оговоренную сумму и с гарантией качества"
        />
        <PhotoGallery
          title="Реализованные проекты дачных модульных домов"
          subtitle="Готовые дачные дома, построенные нами для комфортного отдыха. Модульные дома стали популярным решением для дачи благодаря скорости строительства и доступной цене. Типовой проект или индивидуальная планировка могут быть адаптированы под ваши потребности."
        />
        <DeliveryInstallation
          title="Доставка и установка дачного дома за 1-2 дня"
          subtitle="Мы не просто строим дачные дома - мы обеспечиваем полный цикл: от производства до установки на вашем участке."
          footerText="Вы просто выбираете проект дачного дома, а мы делаем всё остальное."
        />
      </Layout>
    </>
  );
}