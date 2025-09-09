import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import Hero from '../components/Hero'
import ProblemSolution from '../components/ProblemSolution'
import Bestsellers from '../components/Bestsellers/Bestsellers'
import VideoReviews from '../components/VideoReviews'
import Features from '../components/Features'
import VirtualTour from '../components/VirtualTour'
import ProductionProcess from '../components/ProductionProcess'
import ProjectConstructor from '../components/ProjectConstructor'
import WhyChooseUs from '../components/WhyChooseUs'
import Guarantees from '../components/Guarantees'
import PhotoGallery from '../components/PhotoGallery'
import DeliveryInstallation from '../components/DeliveryInstallation'

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://house-modular.ru/#business",
    "name": "Easy House",
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
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
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