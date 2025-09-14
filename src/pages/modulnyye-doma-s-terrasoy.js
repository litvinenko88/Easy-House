import { useMemo } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import BestsellersWithTerrace from "../components/BestsellersWithTerrace";
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

export default function ModularHomesWithTerrace() {
  // Мемоизация структурированных данных для производительности
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://house-modular.ru/modulnyye-doma-s-terrasoy#business",
      name: "House Modular - Модульные дома с террасой",
      description:
        "Модульный дом с террасой под ключ для круглогодичного проживания. Собственное производство модульных домов с быстровозводимой технологией.",
      url: "https://house-modular.ru/modulnyye-doma-s-terrasoy",
      telephone: "+7 (800) 123-45-67",
      priceRange: "от 855,000 ₽",
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
        name: "Каталог модульных домов с террасой",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Модульный дом с террасой",
              description:
                "Готовый модульный дом с террасой под ключ для круглогодичного проживания",
              url: "https://house-modular.ru/modulnyye-doma-s-terrasoy/",
              offers: {
                "@type": "Offer",
                price: "855000",
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
        "https://wa.me/78001234567",
      ],
      potentialAction: {
        "@type": "OrderAction",
        target: "https://house-modular.ru/konstruktor/",
        name: "Заказать модульный дом с террасой",
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
          name: "Сколько стоит модульный дом с террасой?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Стоимость модульного дома с террасой от 855 000 рублей под ключ с полной отделкой и коммуникациями.",
          },
        },
        {
          "@type": "Question",
          name: "Сколько времени занимает строительство?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Полный цикл строительства модульного дома с террасой занимает 30 дней, монтаж на участке - 1-2 дня.",
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
      name: "Модульный дом с террасой",
      brand: {
        "@type": "Brand",
        name: "House Modular",
      },
      category: "Модульные дома",
      image: "https://house-modular.ru/images/terrace-house.jpg",
      offers: {
        "@type": "Offer",
        price: "855000",
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
          name: "Модульные дома с террасой",
          item: "https://house-modular.ru/modulnyye-doma-s-terrasoy",
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
          content="https://house-modular.ru/images/terrace-house-og.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Модульный дом с террасой" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@house_modular" />
        <meta
          name="twitter:image"
          content="https://house-modular.ru/images/terrace-house-og.jpg"
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
        title="Модульный дом с террасой под ключ в Москве 🏡 Готовые модульные дома и бани с террасой для круглогодичного проживания"
        description="Модульный дом с террасой под ключ для круглогодичного проживания ✅ Быстровозводимый загородный дом с планировкой террасы ✅ Строительство модульных домов и производство модульных домов с собственное производство"
        keywords="модульный дом с террасой, модульный дом под ключ, дом">
        <Hero
          title={
            <>
              Готовый модульный дом под ключ{" "}
              <span style={{ color: "#ff6b35" }}>
                с террасой для круглогодичного проживания
              </span>{" "}
            </>
          }
          subtitle="Полноценный каркасный модульный дом для круглогодичного проживания"
          advantages={[
            "С полной отделкой",
            "Строительство за 30 дней",
            "Фиксированная цена",
            "Гарантия 5 лет",
          ]}
        />
        <ProblemSolution
          title={
            <>
              Строительство модульных домов - это сложно?{" "}
              <span style={{ color: "#ff6b35" }}>
                Мы нашли идеальное решение
              </span>
            </>
          }
          problemTitle="Традиционное строительство"
          solutionTitle="Возведения модульного дома"
          problems={[
            "Долго и непредсказуемо",
            "Смета постоянно растет",
            "Поиск и контроль мастеров",
            "Скрытые дефекты работ",
          ]}
          solutions={[
            "Быстровозводимый дом за 1-2 дня",
            "Честная цена, которая не меняется",
            "Всё включено: от сборки до отделки",
            "Прозрачный контроль на всех этапах",
          ]}
          subtitle="Начните жить в доме вашей мечты"
        />
        <BestsellersWithTerrace
          title="Готовые модульные дома и бани с террасой"
          subtitle="Проверенные проекты и цены модульных домов, которые выбирают наши клиенты"
        />
        <VideoReviews
          title="Видеоэкскурсии по нашим домам"
          description="Убедитесь в качестве внутренней отделки и продуманности каждого квадратного метра"
        />
        <Features title="Комплектация для постоянного проживания" />
        <VirtualTour
          title="Планировка модульного дома под ключ"
          description="Хотите заранее увидеть каждый квадратный метр, расставить мебель и оценить комфорт? Изучите готовые проекты и цены в интерактивной 3D-экскурсии. Погуляйте по реализованным проектам, оцените детали внутренней и наружной отделки и представьте жизнь в новом модульном доме для круглогодичного проживания - ещё до начала строительства на участке."
        />
        <ProductionProcess
          title="Производство модульных домов и бань: точность на каждом этапе"
          subtitle="От проекта модульного дома до готового решения: модульная технология мирового уровня для вашего комфорта."
          description="Наше производство модульных домов и бань под ключ исключает ошибки и гарантирует высочайшее качество. Строим дома на заводе, используя современное оборудование и отборные материалы для строительства."
          guarantee="Этот подход гарантирует, что ваш модульный дом подходит для круглогодичного проживания, будет теплым, тихим и готовым к комфортной жизни"
        />
        <ProjectConstructor
          title="Готовые проекты и цены не подошли?"
          subtitle="Создайте индивидуальную планировка модульного дома"
          description="Разработайте уникальный проект всего за несколько минут и получите готовый 3D-тур по вашему будущему жилому дому для круглогодичного проживания"
        />
        <WhyChooseUs
          title="Преимущества модульных домов"
          subtitle="Технология строительства модульных домов - это принципиально новый уровень комфорта, надежности и экономии для вашего загородного дома"
          ctaTitle="Готовы начать строительство?"
          ctaText="Получите расчет стоимости вашего модульного дома"
        />
        <Guarantees
          title="Гарантия на модульный дома под ключ"
          subtitle="Строительство дома ответственный шаг. Наша работа прозрачна и защищена юридически при заказе дома под ключ"
          footerText="С нами вы можете быть спокойны: ваш модульный дом под ключ будет построен в срок, за оговоренную сумму и с гарантией качества"
        />
        <PhotoGallery
          title="Реализованные проекты модульных домов с террасой"
          subtitle="Готовые модульные дома и бани, построенные нами для круглогодичного проживания. Модульные дома стали популярным решением благодаря скорости строительства. Дома используются как основное жилье или гостевой дом. Типовой проект или индивидуальная планировка дома могут быть адаптированы под ваши потребности. Площадь дома модульного дома зависит от выбранной комплектации."
        />
        <DeliveryInstallation
          title="Доставка модульного дома за 1-2 дня под ключ"
          subtitle="Мы не просто строим модульные дома - мы обеспечиваем полный цикл: от производства до строительных работ на вашем участке."
          footerText="Вы просто выбираете проекты модульных домов под ключ мы делаем всё остальное."
        />
      </Layout>
    </>
  );
}
