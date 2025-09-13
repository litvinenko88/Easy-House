import Head from "next/head";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import VideoReviews from "../components/VideoReviews";
import Features from "../components/Features";
import VirtualTour from "../components/VirtualTour";
import ProductionProcess from "../components/ProductionProcess";
import ProjectConstructor from "../components/ProjectConstructor";
import WhyChooseUs from "../components/WhyChooseUs";
import Guarantees from "../components/Guarantees";
import PhotoGallery from "../components/PhotoGallery";
import DeliveryInstallation from "../components/DeliveryInstallation";

export default function ModularHomesWithTerrace() {
  const structuredData = {
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
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <Layout
        title="Модульный дом с террасой под ключ в Москве 🏡 Готовые модульные дома и бани с террасой для круглогодичного проживания"
        description="Модульный дом с террасой под ключ для круглогодичного проживания ✅ Быстровозводимый загородный дом с планировкой террасы ✅ Строительство модульных домов и производство модульных домов с собственное производство"
        keywords="модульный дом с террасой, модульный дом под ключ, дом под ключ в москве, готовые модульные дома и бани, модульный дом для круглогодичного проживания, строительство модульных домов"
        canonical="https://house-modular.ru/modulnyye-doma-s-terrasoy/"></Layout>
    </>
  );
}
