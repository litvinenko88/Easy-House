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

export default function ModularHomesWithFinishing() {
  // Мемоизация структурированных данных для производительности
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://house-modular.ru/modulnyye-doma-s-otdelkoy-i-kommunikatsiyami#business",
      name: "House Modular - Модульные дома с отделкой и коммуникациями",
      description:
        "Модульный дом с отделкой и коммуникациями под ключ для круглогодичного проживания. Собственное производство модульных домов с полной комплектацией.",
      url: "https://house-modular.ru/modulnyye-doma-s-otdelkoy-i-kommunikatsiyami",
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
        name: "Каталог модульных домов с отделкой и коммуникациями",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Модульный дом с отделкой и коммуникациями",
              description:
                "Готовый модульный дом с полной отделкой и коммуникациями под ключ для круглогодичного проживания",
              url: "https://house-modular.ru/modulnyye-doma-s-otdelkoy-i-kommunikatsiyami/",
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
        name: "Заказать модульный дом с отделкой и коммуникациями",
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
          name: "Сколько стоит модульный дом с отделкой и коммуникациями?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Стоимость модульного дома с отделкой и коммуникациями от 855 000 рублей под ключ с полной комплектацией.",
          },
        },
        {
          "@type": "Question",
          name: "Что входит в отделку и коммуникации?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "В комплектацию входит: электрика, сантехника, отопление, внутренняя и внешняя отделка, окна, двери.",
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
      name: "Модульный дом с отделкой и коммуникациями",
      brand: {
        "@type": "Brand",
        name: "House Modular",
      },
      category: "Модульные дома",
      image: "https://house-modular.ru/images/finishing-house.jpg",
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
          name: "Модульные дома с отделкой и коммуникациями",
          item: "https://house-modular.ru/modulnyye-doma-s-otdelkoy-i-kommunikatsiyami",
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
          content="https://house-modular.ru/images/finishing-house-og.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Модульный дом с отделкой и коммуникациями" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@house_modular" />
        <meta
          name="twitter:image"
          content="https://house-modular.ru/images/finishing-house-og.jpg"
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
        title="Модульный дом с отделкой и коммуникациями под ключ в Москве 🏡 Готовые модульные дома с полной комплектацией"
        description="Модульный дом с отделкой и коммуникациями под ключ для круглогодичного проживания ✅ Полная комплектация: электрика, сантехника, отопление ✅ Строительство модульных домов с отделкой"
        keywords="модульный дом с отделкой, модульный дом с коммуникациями, модульный дом под ключ">
        <Hero
          title="Готовый модульный дом под ключ с отделкой и коммуникациями"
          titleSub="от"
          price="855 000₽"
          subtitle="Полноценный каркасный модульный дом с полной комплектацией для круглогодичного проживания"
          advantages={[
            "С полной отделкой",
            "Все коммуникации включены",
            "Строительство за 30 дней",
            "Фиксированная цена",
          ]}
        />
      </Layout>
    </>
  );
}