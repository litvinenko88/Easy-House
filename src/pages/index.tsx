import { useMemo } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout/Layout'
import Hero from '../components/Hero'
import ProblemSolution from '../components/ProblemSolution'
import Bestsellers from '../components/Bestsellers/Bestsellers'
import Features from '../components/Features'
import VirtualTour from '../components/VirtualTour'
import ProductionProcess from '../components/ProductionProcess'
import ProjectConstructor from '../components/ProjectConstructor'
import WhyChooseUs from '../components/WhyChooseUs'
import Guarantees from '../components/Guarantees'

const VideoReviews = dynamic(() => import('../components/VideoReviews'))
const PhotoGallery = dynamic(() => import('../components/PhotoGallery'))
const DeliveryInstallation = dynamic(() => import('../components/DeliveryInstallation'))

export default function Home() {
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://house-modular.ru/#business",
    "name": "House Modular",
    "description": "Производство и строительство модульных домов под ключ за 30 дней",
    "url": "https://house-modular.ru",
    "telephone": "+7 (800) 123-45-67",
    "priceRange": "от 855,000 ₽",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU",
      "addressRegion": "Россия"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.7558",
      "longitude": "37.6176"
    },
    "openingHours": "Mo-Su 09:00-21:00",
    "serviceArea": [
      {
        "@type": "State",
        "name": "Ставропольский край"
      },
      {
        "@type": "State",
        "name": "Краснодарский край"
      },
      {
        "@type": "State",
        "name": "Республика КЧР"
      },
      {
        "@type": "State",
        "name": "Республика КБР"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Каталог модульных домов",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Новый Архангельск",
            "description": "Модульный дом под ключ от 855 000 рублей",
            "url": "https://house-modular.ru/catalog/novyj-arkhangelsk/",
            "image": "https://house-modular.ru/images/New_Arkhangelsk/1.jpg",
            "offers": {
              "@type": "Offer",
              "price": "855000",
              "priceCurrency": "RUB",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Барнхаус",
            "description": "Модульный дом в стиле барнхаус от 891 000 рублей",
            "url": "https://house-modular.ru/catalog/barnkhaus/",
            "image": "https://house-modular.ru/images/Barnhouse/1.jpg",
            "offers": {
              "@type": "Offer",
              "price": "891000",
              "priceCurrency": "RUB",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Четырехмодульный Барн",
            "description": "Большой модульный дом от 3 130 000 рублей",
            "url": "https://house-modular.ru/catalog/chetyrekhmodulnyj-barn/",
            "image": "https://house-modular.ru/images/Four_Module_Barn/1.jpg",
            "offers": {
              "@type": "Offer",
              "price": "3130000",
              "priceCurrency": "RUB",
              "availability": "https://schema.org/InStock"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Модульные дома для бизнеса",
            "description": "Коммерческие модульные здания",
            "url": "https://house-modular.ru/dlya-biznesa/"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://vk.com/easy_house_ru",
      "https://t.me/easy_house_ru",
      "https://wa.me/78001234567"
    ],
    "potentialAction": {
      "@type": "OrderAction",
      "target": "https://house-modular.ru/konstruktor/",
      "name": "Заказать модульный дом"
    }
  }), [])

  const breadcrumbSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://house-modular.ru/"
      }
    ]
  }), [])

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=yes" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="House Modular" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:image" content="https://house-modular.ru/images/main-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Модульные дома под ключ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@house_modular" />
        <meta name="author" content="House Modular" />
        <meta name="publisher" content="House Modular" />
        <meta name="language" content="ru" />
        <meta name="geo.region" content="RU" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
      </Head>
      <Layout 
        title="Строительство модульных домов под ключ 🔑 за 30 дней | От 855 000р за дом" 
        description="Модульные дома от производителя под ключ за 30 дней 🔑| Строительство модульных домов для круглогодичного проживания с отделкой и коммуникациями | Доставка и гарантия | Собственное производство модульных домов"
        keywords="модульный дом под ключ, модульный дом цена, купить модульный дом, готовый модульный дом, производство модульных домов, модульный дом с отделкой, модульный дом с коммуникациями"
        canonical="https://house-modular.ru/"
      >
        <Hero 
          title="Модульные дома "
          titleSub="под ключ от"
          price="855 000₽"
          subtitle="Это не просто коробка с окнами — это полноценный дом"
          advantages={[
            "Заезжайте через 30 дней",
            "Полный цикл «под ключ»",
            "Фиксированная цена",
            "Скорость и прозрачность"
          ]}
        />
        <ProblemSolution 
          problems={[
            "Стройка затягивается на месяцы",
            "Цена растет в процессе",
            "Много подрядчиков",
            "Непрозрачное качество"
          ]}
          solutions={[
            "Сборка за 1-2 дня",
            "Фиксированная стоимость",
            "Один исполнитель",
            "Фото/видео отчеты"
          ]}
        />
        <Bestsellers />
        <VideoReviews showViewAllButton={true} />
        <Features />
        <VirtualTour />
        <ProductionProcess />
        <ProjectConstructor />
        <WhyChooseUs />
        <Guarantees />
        <PhotoGallery />
        <DeliveryInstallation />
      </Layout>
    </>
  )
}