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
    "@id": "https://easy-house.ru/#business",
    "name": "Easy House",
    "description": "Производство и строительство модульных домов под ключ за 30 дней",
    "url": "https://easy-house.ru",
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
    "serviceArea": {
      "@type": "Country",
      "name": "Россия"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Каталог модульных домов",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Модульные дома под ключ",
            "description": "Полноценные модульные дома с отделкой и коммуникациями"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
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
        title="Строительство модульных домов под ключ за 30 дней | От 855 000₽" 
        description="Модульные дома от производителя под ключ за 30 дней. Строительство модульных домов для круглогодичного проживания с отделкой и коммуникациями. Доставка по России, гарантия качества. Собственное производство."
        keywords="модульные дома под ключ, модульные дома цена, купить модульный дом, готовые модульные дома, производство модульных домов, модульные дома с отделкой, модульные дома с коммуникациями, каркасные дома, дома за 30 дней, строительство домов, быстровозводимые дома, дома для постоянного проживания"
        canonical="https://easy-house.ru/"
      >
        <Hero />
        <ProblemSolution/>
        <Bestsellers/>
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