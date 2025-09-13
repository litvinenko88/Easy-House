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

export default function ModularHomesWithTerrace() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://house-modular.ru/modulnyye-doma-s-terrasoy#business",
    "name": "House Modular - Модульные дома с террасой",
    "description": "Модульный дом с террасой под ключ для круглогодичного проживания. Собственное производство модульных домов с быстровозводимой технологией.",
    "url": "https://house-modular.ru/modulnyye-doma-s-terrasoy",
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
      "name": "Каталог модульных домов с террасой",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Модульный дом с террасой",
            "description": "Готовый модульный дом с террасой под ключ для круглогодичного проживания",
            "url": "https://house-modular.ru/modulnyye-doma-s-terrasoy/",
            "offers": {
              "@type": "Offer",
              "price": "855000",
              "priceCurrency": "RUB",
              "availability": "https://schema.org/InStock"
            }
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
      "name": "Заказать модульный дом с террасой"
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
        title="Модульный дом с террасой под ключ в Москве 🏡 Готовые модульные дома и бани с террасой для круглогодичного проживания" 
        description="Модульный дом с террасой под ключ для круглогодичного проживания ✅ Быстровозводимый загородный дом с планировкой террасы ✅ Строительство модульных домов и производство модульных домов с собственное производство"
        keywords="модульный дом с террасой, модульный дом под ключ, дом под ключ в москве, готовые модульные дома и бани, модульный дом для круглогодичного проживания, строительство модульных домов"
        canonical="https://house-modular.ru/modulnyye-doma-s-terrasoy/"
      >
        <Hero 
          title="Готовый модульный дом с террасой "
          titleSub="под ключ от"
          price="855 000₽"
          subtitle="Модульный дом для круглогодичного проживания с просторной террасой"
          advantages={[
            "Готовый дом под ключ в Москве за 30 дней",
            "Строительство модульных домов с террасой",
            "Планировка с террасой включена",
            "Производство модульных домов на заводе"
          ]}
        />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Модульный дом с террасой под ключ - готовые модульные дома и бани с террасой
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-lg mb-4">
                  Наш <strong>модульный дом</strong> с террасой представляет собой идеальное решение для тех, кто ищет <strong>дом под ключ</strong> с дополнительным пространством для отдыха. Каждый <strong>модульный</strong> проект включает просторную террасу, которая становится естественным продолжением жилого пространства.
                </p>
                <p className="text-lg mb-4">
                  <strong>Модульный дом под ключ</strong> с террасой - это <strong>быстровозводимый</strong> загородный дом, который подходит для <strong>круглогодичного проживания</strong>. Наше <strong>собственное производство</strong> позволяет контролировать качество каждого модуля и обеспечивать точную <strong>планировку</strong> с учетом террасы.
                </p>
              </div>
              <div>
                <p className="text-lg mb-4">
                  <strong>Готовый</strong> модульный дом с <strong>террасой</strong> включает полную <strong>отделку</strong>, все коммуникации и <strong>монтаж</strong> на вашем участке. <strong>Площадь дома</strong> рассчитывается с учетом террасы, что позволяет максимально эффективно использовать каждый <strong>квадратный метр</strong>.
                </p>
                <p className="text-lg mb-4">
                  Наши <strong>готовые модульные дома и бани</strong> с террасой производятся на современном заводе с использованием <strong>каркасный</strong> технологии и качественного <strong>утепление</strong>. Мы предоставляем полную <strong>гарантия</strong> на все выполненные работы.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Преимущества модульных домов с террасой - проекты и цены
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Модуль с террасой</h3>
                <p>
                  Каждый <strong>модуль</strong> нашего дома спроектирован с учетом <strong>террасой</strong>. <strong>Строительный</strong> процесс включает изготовление <strong>готовых модулей</strong> на заводе с последующей <strong>сборка</strong> на участке.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Готовый загородный дом</h3>
                <p>
                  <strong>Загородный</strong> дом с <strong>терраса</strong> для <strong>постоянного проживания</strong>. Полная <strong>внутренняя отделка</strong> и <strong>электрика</strong> включены в стоимость. <strong>Доставка</strong> осуществляется по всей России.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Дома под ключ в Москве</h3>
                <p>
                  <strong>Дома под ключ в Москве</strong> и области с <strong>доставкой по всей россии</strong>. Наши <strong>дома компании</strong> отличаются высоким качеством и <strong>доступной цене</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Купить дом с террасой - готовые проекты и цены модульных домов
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Проект модульного дома с террасой</h3>
                <p className="text-lg mb-4">
                  <strong>Проект модульного дома</strong> с террасой разрабатывается с учетом всех требований для <strong>круглогодичного проживания под ключ</strong>. <strong>Модульной технологии</strong> позволяет создать <strong>дом для круглогодичного проживания</strong> с оптимальной планировкой.
                </p>
                <p className="text-lg mb-4">
                  <strong>Купить модульный дом</strong> с террасой можно в различных <strong>комплектации</strong>. <strong>Типовой</strong> проект включает <strong>внутренняя и внешняя отделка</strong>, все необходимые коммуникации и <strong>инженерный</strong> системы.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Производство модульных домов и бань</h3>
                <p className="text-lg mb-4">
                  <strong>Производство модульных домов и бань</strong> осуществляется на нашем заводе. <strong>Дома на заводе</strong> изготавливаются с соблюдением всех технологических процессов. <strong>Быстровозводимые дома</strong> готовы к заселению сразу после монтажа.
                </p>
                <p className="text-lg mb-4">
                  <strong>Купить модульный дом под ключ</strong> с террасой - значит получить <strong>жилой дом</strong> с максимальным <strong>комфортом</strong>. <strong>Наши дома</strong> подходят как для постоянного, так и для сезонного проживания.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Возведения модульного дома с террасой - наши дома с гарантия
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-lg mb-4">
                  Процесс <strong>возведения модульного дома</strong> с террасой занимает минимальное время благодаря заводскому изготовлению. <strong>Модульные дома в москве</strong> пользуются особой популярностью из-за скорости строительства и отсутствия необходимости в длительной <strong>стройки на участке</strong>.
                </p>
                <p className="text-lg mb-4">
                  <strong>Модель дома</strong> с террасой может включать дополнительные элементы: <strong>сауна</strong>, <strong>гостевой дом</strong> или другие постройки. <strong>Проекты модульных домов под ключ</strong> разрабатываются индивидуально под каждого клиента.
                </p>
              </div>
              <div>
                <p className="text-lg mb-4">
                  <strong>Модульные дома стали</strong> популярным решением благодаря качеству и скорости возведения. <strong>Дома позволяет</strong> существенно сократить время строительства по сравнению с традиционными методами. <strong>Дома используются</strong> современные материалы и технологии.
                </p>
                <p className="text-lg mb-4">
                  <strong>Внутренней и наружной</strong> отделка выполняется на заводе, что гарантирует высокое качество. <strong>Дома могут</strong> быть адаптированы под любые климатические условия. <strong>Строим дома</strong> с учетом всех пожеланий заказчика.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Реализованные проекты - дом вашей мечты с террасой
            </h2>
            
            <div className="text-center mb-8">
              <p className="text-lg mb-4">
                <strong>Дом вашей мечты</strong> с террасой может стать реальностью уже через месяц. Стоимость <strong>модульного дома зависит</strong> от выбранной комплектации и размера террасы. <strong>Вашего дома</strong> проект разрабатывается с учетом всех ваших пожеланий.
              </p>
              <p className="text-lg mb-4">
                <strong>Реализованные проекты</strong> демонстрируют высокое качество наших домов. Отсутствие <strong>строительства на участке</strong> в традиционном понимании позволяет избежать многих проблем и получить готовый результат в кратчайшие сроки.
              </p>
              <p className="text-lg">
                <strong>Домов в москве и московской</strong> области мы построили уже более 500. Работаем в <strong>москве и московской области</strong> и других регионах России, обеспечивая качественную доставку и монтаж.
              </p>
            </div>
          </div>
        </section>

        <ProblemSolution 
          problems={[
            "Долгое строительство террасы",
            "Сложная планировка с террасой", 
            "Высокая стоимость фундамента",
            "Проблемы с утеплением террасы"
          ]}
          solutions={[
            "Готовая терраса в модуле",
            "Продуманная планировка",
            "Легкий фундамент", 
            "Заводское утепление"
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