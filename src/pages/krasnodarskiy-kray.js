import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero/Hero";
import ProblemSolution from "../components/ProblemSolution/ProblemSolution";
import Features from "../components/Features/Features";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import VideoReviews from "../components/VideoReviews";
import VirtualTour from "../components/VirtualTour/VirtualTour";
import ProductionProcess from "../components/ProductionProcess/ProductionProcess";
import ProjectConstructor from "../components/ProjectConstructor/ProjectConstructor";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import Guarantees from "../components/Guarantees/Guarantees";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";
import VideoTestimonials from "../components/VideoTestimonials/VideoTestimonials";
import DeliveryInstallation from "../components/DeliveryInstallation/DeliveryInstallation";
import FAQReviews from "../components/FAQReviews/FAQReviews";

export default function KrasnodarskiyKray() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://house-modular.ru/krasnodarskiy-kray/#business",
    name: "Easy House - Краснодарский край",
    description: "Строительство модульных домов под ключ в Краснодарском крае",
    url: "https://house-modular.ru/krasnodarskiy-kray",
    telephone: "+7 (800) 123-45-67",
    priceRange: "от 855,000 ₽",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RU",
      addressRegion: "Краснодарский край",
    },
    serviceArea: {
      "@type": "State",
      name: "Краснодарский край",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Layout
        title="Модульные дома под ключ в Краснодаре и в Краснодарском край"
        description="Модульный дом под ключ в Краснодаре и Краснодарском крае от производителя. Строительство быстровозводимых каркасных домов: готовые решения для круглогодичного проживания. Быстровозводимый дом современное и надежное каркасное жилье под ключ в Краснодаре."
        keywords="модульный дом Краснодар, дом под ключ Краснодарский край, быстровозводимый дом, каркасные дома под ключ, модульный дом готовый, строительство модульных домов, модульный дом Краснодарский край, купить модульный дом, каркасный дом под ключ, быстровозводимые дома Краснодар">
        <Hero
          title={
            <>
              Модульные дома под ключ в{" "}
              <span style={{ color: "#ff6b35" }}>
                Краснодаре и в Краснодарском крае
              </span>
            </>
          }
          titleSub=""
          advantages={[
            "Строим на любых грунтах",
            "Учитываем климат региона",
            "Полностью сдан через 30 дней",
            "Цена от 855 000₽",
          ]}
        />
        <ProblemSolution
          title="Возведение дома - это проблема? Мы нашли решение"
          problemTitle="Традиционная стройка"
          solutionTitle="Модульные дома"
          problems={[
            "Работы идут месяцами",
            "Бюджет постоянно растёт",
            "Множество исполнителей",
            "Качество неясно",
          ]}
          solutions={[
            "Монтаж за 1–2 дня",
            "Честная цена и недорого",
            "Одна компания",
            "Отчёты онлайн",
          ]}
          subtitle="Хватит волноваться, время жить"
        />
        <Bestsellers
          title="Наши готовые дома"
          subtitle="Популярные быстровозводимые модульные - дачные дома, которые выбирают наши клиенты"
        />
        <VideoReviews
          title="Видеообзоры наших домов"
          description="Индивидуальное решение и продуманности каждой детали в проектирование быстровозводимых модульных домов"
          showViewAllButton={true}
        />
        <Features 
          title="Что входит в комплектацию дома"
          features={[
            {
              id: 1,
              title: "Надёжность и современный дизайн",
              description: "Прочная односкатная крыша с мягким покрытием обеспечивает полную герметичность и стойкость в любое время года.",
              image: "/images/communications/1.webp"
            },
            {
              id: 2,
              title: "Прочность на десятилетия",
              description: "Каркас из камерно-сушеного бруса сохраняет геометрию, долговечность и устойчивость к нагрузкам таких домов.",
              image: "/images/communications/2.webp"
            },
            {
              id: 3,
              title: "Тепло и тишина в любой сезон",
              description: "Контур утепления минеральной ватой для идеального микроклимата зимой и летом, плюс защита от шума частных домов",
              image: "/images/communications/3.webp"
            },
            {
              id: 4,
              title: "Под ключ или под вашу отделку",
              description: "Ровное основание из OSB дом полностью с готовым покрытием или под чистовую отделку - решайте сами.",
              image: "/images/communications/4.webp"
            },
            {
              id: 5,
              title: "Уют и экология внутри",
              description: "Отделка из натуральной сосны для здоровой атмосферы и особенного уюта вашего круглогодичного дома.",
              image: "/images/communications/5.webp"
            },
            {
              id: 6,
              title: "Стиль и долговечность снаружи",
              description: "Гармония материалов: классика дерева и современность профлиста для эстетики и надёжности постоянного проживания",
              image: "/images/communications/6.webp"
            },
            {
              id: 7,
              title: "Фундамент без проблем",
              description: "Свайно-винтовое основание с обвязкой для стабильности на любой почве без долгой подготовки.",
              image: "/images/communications/7.webp"
            },
            {
              id: 8,
              title: "Энергоэффективные окна",
              description: "Трёхкамерные стеклопакеты берегут тепло, снижают шум и помогают экономить на отоплении.",
              image: "/images/communications/8.webp"
            },
            {
              id: 9,
              title: "Тёплая и безопасная дверь",
              description: "Металлическая входная дверь с терморазрывом защищает от холода и сквозняков.",
              image: "/images/communications/9.webp"
            },
            {
              id: 10,
              title: "Вода всегда горячая",
              description: "Накопительный водонагреватель обеспечивает постоянный запас горячей воды на все нужды.",
              image: "/images/communications/10.webp"
            },
            {
              id: 11,
              title: "Равномерное тепло везде",
              description: "Эффективные конвекторы быстро прогревают комнаты и поддерживают комфортную температуру теплого контура дома",
              image: "/images/communications/11.webp"
            },
            {
              id: 12,
              title: "Всё для жизни сразу",
              description: "Полная комплектация сантехникой и электрикой — можно заселяться и жить без забот.",
              image: "/images/communications/12.webp"
            }
          ]}
        />
        <VirtualTour 
          title="Загляните в свой дом уже сегодня"
          description="Хотите прикинуть, как встанет мебель или где будет спальня? Зайдите на виртуальный 3D-тур по нашему модульному дому для круглогодичного проживания. Пройдитесь по готовым планировкам, рассмотрите всё до мелочей дома под ключ проект и почувствуйте атмосферу - ещё до того, как новый дом будет построен."
        />
      </Layout>
    </>
  );
}
