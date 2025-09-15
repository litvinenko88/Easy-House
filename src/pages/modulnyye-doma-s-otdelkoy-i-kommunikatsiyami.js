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
      "@id":
        "https://house-modular.ru/modulnyye-doma-s-otdelkoy-i-kommunikatsiyami#business",
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
        <meta
          property="og:image:alt"
          content="Модульный дом с отделкой и коммуникациями"
        />

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
        title="Модульные дома под ключ с отделкой и коммуникациями"
        description="Предлагаем современные модульные дома под ключ для круглогодичного проживания. Мы осуществляем полный цикл: от производства модульных домов до сдачи объекта под ключ. Каждый модульный дом поставляется готовый с полной отделкой, со всеми необходимыми коммуникациями. Гарантия 5 лет"
        keywords="Модульные дома под ключ, модульные дома с отделкой, модульные дома с коммуникациями, модульные дома под ключ с отделкой и коммуникациями, модульные дома">
        <Hero
          title={
            <>
              Готовый модульный дом под ключ{" "}
              <span style={{ color: "#ff6b35" }}>
                с полной отделкой и коммуникациями
              </span>{" "}
            </>
          }
          price="855 000₽"
          subtitle="Полностью готовый модульный дом"
          advantages={[
            "Цену знаете сразу",
            "Заезжайте после монтажа",
            "Гарантия 5 лет",
            "Теплея кирпича",
          ]}
        />
        <ProblemSolution
          title="Обычная стройка или готовые модульные дома под ключ?"
          problemTitle="Обычное строительство"
          solutionTitle="Наш монтаж модульного дома"
          problems={[
            "Долгие месяцы работ",
            "Растущая смета",
            "Поиск подрядчиков",
            "Непредвиденные проблемы",
          ]}
          solutions={[
            "Сборка за 1-2 дня",
            "Фиксированная стоимость дома по договору",
            "Единственный исполнитель",
            "Полная отделка и коммуникации",
          ]}
          subtitle="Заезжайте и живите!"
        />
        <Bestsellers
          title="Готовые проекты и цены модульных домов"
          subtitle="Популярные дома, которые выбирают наши клиенты"
        />
        <VideoReviews
          title="Готовый дом внутри: смотрите видео"
          description="Убедитесь в качестве внутренней отделки и комфорте для круглогодичного проживания"
        />
        <Features
          title="Комплектация модульного дома для круглогодичного проживания"
        />
        <VirtualTour
          title="Оцените планировку готового модульного дома"
          description="Хотите заранее увидеть площадь дома и расставить мебель? Воспользуйтесь 3D-туром по нашему дому. Погуляйте по готовым проектам, изучите планировку изнутри и представьте жизнь в доме вашей мечты - еще до монтажа."
        />
        <ProductionProcess
          title="Немецкая точность производства"
          subtitle="От проекта до готового дома: процесс мирового уровня"
          description="Наше производство модульных домов исключает ошибки и гарантирует качество каждого квадратного метра. Мы используем немецкое оборудование и отборные материалы для домов премиум-класса."
          steps={[
            {
              id: 1,
              title: "Проектирование",
              description: "Создаем цифровой макет и чертежи каждой панели.",
              icon: "📏"
            },
            {
              id: 2,
              title: "Раскрой и обработка",
              description: "Автомат раскраивает пиломатериал для одного модуля.",
              icon: "🔧"
            },
            {
              id: 3,
              title: "Сборка каркаса",
              description: "Роботизированная линия собирает прочный каркас.",
              icon: "🏧"
            },
            {
              id: 4,
              title: "Обшивка ГСП",
              description: "Каркас обшивается экологичной плитой.",
              icon: "🛡️"
            },
            {
              id: 5,
              title: "Монтаж пароизоляции",
              description: "Укладывается мембрана «Изоспан».",
              icon: "💨"
            },
            {
              id: 6,
              title: "Укладка утеплителя",
              description: "Плотно укладывается негорючий утеплитель.",
              icon: "🧧"
            },
            {
              id: 7,
              title: "Прокладка коммуникаций",
              description: "Монтируется электропроводка и пути коммуникаций.",
              icon: "⚡"
            },
            {
              id: 8,
              title: "Маркировка и упаковка",
              description: "Каждая панель маркируется для быстрой сборки.",
              icon: "📦"
            },
            {
              id: 9,
              title: "Контроль качества",
              description: "Инженер проверяет каждую панель. Гарантия.",
              icon: "✅"
            }
          ]}
          guarantee="Этот подход гарантирует, что дом изготавливается теплым и готовым к постоянного проживания сразу после монтажа на участке в готовом виде."
        />
        <ProjectConstructor
          title="Не нашли подходящую планировку?"
          subtitle="Создайте проект вашего дома сами"
          description="За несколько минут — готовый 3D-тур по дому вашей мечты"
        />
        <WhyChooseUs
          title="Преимущества модульного дома под ключ"
          subtitle="Технология строительства модульных домов — это новый уровень комфорта, надежности и экономии"
          advantages={[
            {
              id: 1,
              title: "Скорость монтажа",
              description: "Полный цикл от фундамента до сдачи ключ в Москве занимает 30 дней. Монтаж на участке — 1-2 дня.",
              icon: "⚡",
              color: "#FF6B35"
            },
            {
              id: 2,
              title: "Фиксированная стоимость",
              description: "Цена модульного дома известна заранее и не меняется. Никаких сюрпризов и переплат.",
              icon: "💰",
              color: "#4ECDC4"
            },
            {
              id: 3,
              title: "Всесезонность строительства",
              description: "Дом можно собирать в любое время года благодаря заводскому производству модулей.",
              icon: "🌦️",
              color: "#45B7D1"
            },
            {
              id: 4,
              title: "Энергоэффективность",
              description: "Многослойное утепление экономит до 50% на отоплении. Все расходы известны заранее.",
              icon: "🔥",
              color: "#96CEB4"
            },
            {
              id: 5,
              title: "Заводское качество",
              description: "Все элементы производятся на точном оборудовании в заводских условиях.",
              icon: "⚙️",
              color: "#FFEAA7"
            },
            {
              id: 6,
              title: "Прочность",
              description: "Каркас не дает усадки и имеет долгий срок службы. Идеален для круглогодичного проживания под ключ.",
              icon: "🏠",
              color: "#DDA0DD"
            }
          ]}
          ctaTitle="Готовы начать строительство модульных домов?"
          ctaText="Получите расчет стоимости дома вашей мечты"
        />
        <Guarantees
          title="Ваша уверенность прописана в договоре"
          subtitle="Строительство дома — ответственный шаг. Наша работа прозрачна и защищена юридически"
          guarantees={[
            {
              id: 1,
              title: "Гарантия 5 лет на дом",
              description: "Мы несем ответственность за конструктив, отделку и системы. Оперативно исправим любые вопросы.",
              icon: "🛡️"
            },
            {
              id: 2,
              title: "Стоимость известна заранее",
              description: "Стоимость дома не изменится после подписания. Доставка и монтаж указаны заранее. Никаких скрытых платежей.",
              icon: "💰"
            },
            {
              id: 3,
              title: "Соблюдение сроков",
              description: "За каждый день просрочки по договору выплачиваем неустойку 0,1% от стоимости работ.",
              icon: "⏰"
            },
            {
              id: 4,
              title: "Прозрачная отчетность",
              description: "Вы получаете фото- и видеоотчеты о ходе производства модульных домов и строительства.",
              icon: "📊"
            },
            {
              id: 5,
              title: "Честная документация",
              description: "Заключаем официальный договор, прописываем все этапы и условия. Вы защищены юридически.",
              icon: "📋"
            }
          ]}
          footerText="С нами вы спокойны: ваш дом будет построен в срок, за оговоренную сумму и с гарантией качества."
        />
        <PhotoGallery
          title="Реализованные проекты модульных домов с комфортом"
          subtitle="Убедитесь в качестве наших домов. Смотрите готовые проекты с полной отделкой и комфортом"
        />
        <DeliveryInstallation
          title="Доставка модульного дома за 1-2 дня"
          subtitle="Мы производим наши дома и берем на себя всю логистику и работы на участке."
          steps={[
            {
              icon: "🏧",
              title: "Подготовка участка",
              desc: "Заранее подготавливаем площадку и фундамент (винтовые сваи)."
            },
            {
              icon: "🚛",
              title: "Доставка",
              desc: "Готовые модули аккуратно доставляются к дома на участке на манипуляторе. Модульных домов с доставкой по всей России."
            },
            {
              icon: "🔧",
              title: "Монтаж",
              desc: "Собираем дом как конструктор за 1-2 дня с помощью профессиональной техники. Компактный дом площадью от 30 кв.м."
            },
            {
              icon: "⚡",
              title: "Подключение коммуникаций",
              desc: "Монтируем и подключаем системы: электрику, отопление, водоснабжение с чистовой отделкой. Санузел и спальня готовы."
            },
            {
              icon: "✨",
              title: "Чистота после установки дома",
              desc: "После себя убираем весь строительный мусор."
            }
          ]}
          footerText="Вы выбираете проект - мы делаем всё остальное. Купить модульный дом можно как основное жилье или гостевой дом. Коттеджный дом из двух модулей или дополнительных модулей для загородного отдыха. Террасой можно дополнить любой проект."
        />
      </Layout>
    </>
  );
}
