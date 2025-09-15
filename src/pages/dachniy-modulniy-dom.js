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

const VideoReviews = dynamic(() => import("../components/VideoReviews"), {
  loading: () => <div>Загрузка...</div>,
});
const PhotoGallery = dynamic(() => import("../components/PhotoGallery"), {
  loading: () => <div>Загрузка галереи...</div>,
});
const DeliveryInstallation = dynamic(() => import("../components/DeliveryInstallation"), {
  loading: () => <div>Загрузка...</div>,
});

export default function DachniyModulniyDom() {
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
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=yes" />
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@house_modular" />
        <meta
          name="twitter:image"
          content="https://house-modular.ru/images/dacha-house-og.jpg"
        />
        <meta name="author" content="House Modular" />
        <meta name="publisher" content="House Modular" />
        <meta name="copyright" content="House Modular" />
        <meta name="language" content="ru" />
        <meta name="geo.region" content="RU" />
        <meta name="geo.placename" content="Россия" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
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
        title="Готовый дачный модульный дом под ключ | Дом для круглогодичного проживания"
        description="Готовый дачный модульный дом под ключ для круглогодичного проживания. Готовые проекты с отделкой и продуманной планировкой. Построить дачу или готовый дом для круглогодичного проживания - доставляем и монтируем под ключ."
        keywords="Дачный модульный дом, дачный дом, дачный модульный дом под ключ, дачный домик под ключ, дом на дачу под ключ">
        <Hero
          title={
            <>
              Быстровозводимые дачные модульные дома{" "}
              <span style={{ color: "#ff6b35" }}>и бани под ключ</span>
            </>
          }
          subtitle="Дачный дом и баня с отделкой и коммуникациями у вас на участке"
          advantages={[
            "Строим на любых грунтах",
            "Собирается за 1-2 дня",
            "Цена известна сразу",
            "Площадь дома от 15 кв/м",
          ]}
        />
        <ProblemSolution
          title="Построить дачный дом или баню - дорого и сложно? Мы решили проблему"
          subtitle="Хватит переживать, начните отдыхать на даче"
          problemTitle="Обычная стройки на участке"
          solutionTitle="Модульные бани и дачи"
          problems={[
            "Стройка затягивается на месяцы",
            "Цена растет в процессе",
            "Много подрядчиков",
            "Непрозрачное качество",
          ]}
          solutions={[
            "Сборка на участке заказчика за 1-2 дня",
            "Фиксированная стоимость постройки",
            "Один исполнитель",
            "Фото/видео отчеты",
          ]}
        />
        <Bestsellers
          title="Готовые проекты и цены модульных домов и бань"
          subtitle="Популярные модульные дома для постоянного проживания, которые выбирают наши заказчики"
        />
        <VideoReviews
          title="Видеоэкскурсии по нашим дачным домам и баням"
          description="Убедитесь в качестве отделки и продуманности каждой детали для комфортного круглогодичного проживания под ключ"
          showViewAllButton={true}
        />
        <Features
          title="Комплектации дачного дома под ключ для отдыха с семьей"
          features={[
            {
              id: 1,
              title: "Надежная защита",
              description:
                "Прочная односкатная кровля обеспечивает абсолютную герметичность и устойчивость к осадкам на дачном участке.",
              image: "/images/communications/1.webp",
            },
            {
              id: 2,
              title: "Прочность модульного дома",
              description:
                "Каркас из строганного бруса гарантирует идеальную геометрию и долговечность вашего модульного дома для круглогодичного проживания.",
              image: "/images/communications/2.webp",
            },
            {
              id: 3,
              title: "Тепло внутри дачного дома",
              description:
                "Полный контур эффективного утепления для комфортного микроклимата во время дачного отдыха зимой и летом.",
              image: "/images/communications/3.webp",
            },
            {
              id: 4,
              title: "Готовое решение",
              description:
                "Прочное основание с финишным покрытием для комфортного отдыха на даче с семьей.",
              image: "/images/communications/4.webp",
            },
            {
              id: 5,
              title: "Уютная атмосфера дачного дома",
              description:
                "Внутренняя отделка из натуральной сосны создает здоровый микроклимат для семейного отдыха на даче.",
              image: "/images/communications/5.webp",
            },
            {
              id: 6,
              title: "Стильный вид",
              description:
                "Эстетичная комбинация качественных материалов: классическая красота дерева и современная надежность для загородного отдыха.",
              image: "/images/communications/6.webp",
            },
            {
              id: 7,
              title: "Прочное основание дачного участка",
              description:
                "Надежный фундамент обеспечивает устойчивость дома на любом типе грунта вашей дачи.",
              image: "/images/communications/7.webp",
            },
            {
              id: 8,
              title: "Тепло и экономия",
              description:
                "Энергоэффективные окна сохраняют тепло и позволяют экономить на отоплении дачного дома.",
              image: "/images/communications/8.webp",
            },
            {
              id: 9,
              title: "Безопасность",
              description:
                "Прочная дверь надежно сохраняет тепло вашего дачного дома для круглогодичного проживания.",
              image: "/images/communications/9.webp",
            },
            {
              id: 10,
              title: "Горячая вода для дачных нужд",
              description:
                "Вместительный бойлер обеспечит запас горячей воды для всей семьи на даче.",
              image: "/images/communications/10.webp",
            },
            {
              id: 11,
              title: "Комфорт и тепло",
              description:
                "Эффективные конвекторы равномерно прогревают помещение для отдыха на даче.",
              image: "/images/communications/11.webp",
            },
            {
              id: 12,
              title: "Полная готовность к дачной жизни",
              description:
                "Вся сантехника и розетка для полноценного отдыха сразу после заселения на дачу.",
              image: "/images/communications/12.webp",
            },
          ]}
        />
        <VirtualTour
          title="Загляните в будущее вашего дачного отдыха"
          description="Хотите заранее оценить планировку дачного дома, где будет стоять диван или кровать? Воспользуйтесь нашей интерактивной 3D-экскурсией по проектам модульных домов под ключ для круглогодичного проживания. Погуляйте по готовым проектам модульных загородных домов, изучите внутреннюю и внешнюю отделку и представьте отдых с семьей в новом дачном доме - еще до начала строительства дома вашей мечты."
        />
        <ProductionProcess
          title="Немецкая точность производства"
          subtitle="От проекта модульного дома до готового дома: технологический процесс для комфортного отдыха на даче"
          description="Наше производство модульных домов на производственной базе гарантирует высочайшее качество каждого модульного дачного дома. Мы используем немецкое оборудование и отборные материалы для возведение модульных домов для постоянного и загородного отдыха с внутренней и внешней отделкой."
          steps={[
            {
              id: 1,
              title: "Проектирование дачного дома",
              description:
                "Создаем цифровой 3D-макет и детальные чертежи для вашего дачного модульного дома.",
              icon: "📐",
            },
            {
              id: 2,
              title: "Раскрой для дачного строительства",
              description:
                "Автомат раскраивает пиломатериал для сборки одного модуля вашей дачи.",
              icon: "🔧",
            },
            {
              id: 3,
              title: "Сборка каркаса",
              description:
                "Роботизированная линия создает прочный каркас для дачного дома.",
              icon: "🏗️",
            },
            {
              id: 4,
              title: "Обшивка дачного модуля",
              description:
                "Каркас обшивается экологичной плитой для вашего загородного отдыха.",
              icon: "🛡️",
            },
            {
              id: 5,
              title: "Пароизоляция дачного дома",
              description: "Укладывается мембрана для защиты от влаги на даче.",
              icon: "💨",
            },
            {
              id: 6,
              title: "Утепление",
              description:
                "Плотно укладывается негорючий утеплитель для комфорта на даче.",
              icon: "🧱",
            },
            {
              id: 7,
              title: "Коммуникации для дачного отдыха",
              description:
                "Монтируется электропроводка для полноценного проживания на даче.",
              icon: "⚡",
            },
            {
              id: 8,
              title: "Маркировка для быстрой сборки",
              description:
                "Каждая панель маркируется для оперативного монтажа на дачном участке.",
              icon: "📦",
            },
            {
              id: 9,
              title: "Контроль качества дачного дома",
              description:
                "Инженер проверяет каждую панель для вашего комфортного отдыха.",
              icon: "✅",
            },
          ]}
          guarantee="Этот подход гарантирует, что ваш дачный модульный дом будет теплым, готовым к круглогодичному проживанию и комфортному отдыху сразу после сборки на участке."
        />
        <ProjectConstructor 
          title="Не нашли подходящую планировку для дачи?"
          subtitle="Спроектируйте идеальный дачный дом сами"
          description="Всего за несколько минут - и готовый 3D-тур по вашему будущему дому для отдыха на даче"
        />
        <WhyChooseUs 
          title="Причины купить модульный дом для дачи"
          subtitle="Модульной технологии дома - это новый уровень комфорта для отдыха на даче"
          advantages={[
            {
              id: 1,
              title: "Быстрое возведение",
              description: "Полный цикл строительства модульного дома занимает 30 дней. Монтаж на вашем дачном участке всего 1-2 дня.",
              icon: "⚡",
              color: "#FF6B35"
            },
            {
              id: 2,
              title: "Фиксированная стоимость дачи",
              description: "Цена модульного дома под ключ известна заранее и не меняется. Никаких сюрпризов для вашего отдыха.",
              icon: "💰",
              color: "#4ECDC4"
            },
            {
              id: 3,
              title: "Строительство в любой сезон",
              description: "Дачный дом можно собирать круглый год благодаря заводскому производству дома на заводе.",
              icon: "🌦️",
              color: "#45B7D1"
            },
            {
              id: 4,
              title: "Энергоэффективность для дачи",
              description: "Качественные материалы многослойное утепление двух модулей экономит до 50% на отоплении вашего дачного дома зимой.",
              icon: "🔥",
              color: "#96CEB4"
            },
            {
              id: 5,
              title: "Качество для загородного отдыха",
              description: "Все элементы производятся на точном оборудовании в контролируемых условиях.",
              icon: "⚙️",
              color: "#FFEAA7"
            },
            {
              id: 6,
              title: "Прочность дачного дома",
              description: "Каркасный дом из сухой древесины не дает усадки и служит десятилетиями для комфортного отдыха на даче.",
              icon: "🏠",
              color: "#DDA0DD"
            }
          ]}
          ctaTitle="Готовы к дачному отдыху?"
          ctaText="Получите расчет стоимости вашего модульного дома для дачи"
        />
        <Guarantees 
          title="Ваша уверенность в дачном отдыхе"
          subtitle="Мы понимаем, что строительство модульного дома - это важный шаг для семейного отдыха. Поэтому наша работа прозрачна и защищена юридически"
          guarantees={[
            {
              id: 1,
              title: "Гарантия 5 лет на дачный дом",
              description: "Мы несем ответственность за конструктив, отделку и коммуникации вашего модульного дома для дачи. В случае вопросов — оперативно исправим.",
              icon: "🛡️"
            },
            {
              id: 2,
              title: "Фиксированная цена",
              description: "Стоимость модульного дачного дома не изменится после подписания договора. Никаких скрытых платежей за строительства на участке.",
              icon: "💰"
            },
            {
              id: 3,
              title: "Соблюдение сроков для дачи",
              description: "За каждый день просрочки, указанной в договоре, мы выплачиваем неустойку. Ваш дачный отдых начнется вовремя.",
              icon: "⏰"
            },
            {
              id: 4,
              title: "Прозрачная отчетность",
              description: "Вы будете получать регулярные фото- и видеоотчеты о ходе производства вашего дачного дома. Вы всегда в курсе прогресса.",
              icon: "📊"
            },
            {
              id: 5,
              title: "Честная документация для дачи",
              description: "Заключаем официальный договор на строительство модульного дома, прописываем все этапы. Вы защищены юридически при покупке дома для загородного отдыха.",
              icon: "📋"
            }
          ]}
          footerText="С нами вы можете быть спокойны: ваш дачный модульный дом будет построен в срок, за оговоренную сумму и с гарантией качества для комфортного семейного отдыха."
        />
        <PhotoGallery 
          title="Реализованные проекты дачных модульных домов"
          subtitle="Лучше один раз увидеть, чем сто раз услышать. Посмотрите, как выглядят готовые дачные дома для отдыха наших заказчиков"
        />
        <DeliveryInstallation 
          title="Доставка и монтаж дачного дома за 1-2 дня"
          subtitle="Мы берем на себя всю логистику и строительные работы на вашем дачном участке."
          steps={[
            {
              icon: "🏧",
              title: "Подготовка дачного участка",
              description: "Заранее подготавливаем площадку и фундамент для вашего модульного дома для дачи."
            },
            {
              icon: "🚛",
              title: "Доставка на дачу",
              description: "Готовые модули аккуратно доставляются к вашему дачному участку для круглогодичного проживания с доставкой по всей россии."
            },
            {
              icon: "🔧",
              title: "Монтаж дачного дома",
              description: "Собираем дом как конструктор за 1-2 дня - ваш готовый дачный дом для отдыха с семьей."
            },
            {
              icon: "⚡",
              title: "Подключение для дачного отдыха",
              description: "Монтируем и подключаем все коммуникации: электрику, отопление, водоснабжение для комфортного проживания на даче."
            },
            {
              icon: "✨",
              title: "Чистота после строительства",
              description: "После себя убираем весь строительный мусор, чтобы вы могли сразу начать отдыхать на даче."
            }
          ]}
          footerText="Вы просто выбираете проект - мы делаем всё остальное для вашего дачного отдыха."
        />
      </Layout>
    </>
  );
}
