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
    "name": "Easy House - Краснодарский край",
    "description": "Строительство модульных домов под ключ в Краснодарском крае",
    "url": "https://house-modular.ru/krasnodarskiy-kray",
    "telephone": "+7 (800) 123-45-67",
    "priceRange": "от 855,000 ₽",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU",
      "addressRegion": "Краснодарский край"
    },
    "serviceArea": {
      "@type": "State",
      "name": "Краснодарский край"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
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
            <span style={{ color: "#ff6b35" }}>Краснодаре и в Краснодарском крае</span>
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
          "Качество неясно"
        ]}
        solutions={[
          "Монтаж за 1–2 дня",
          "Честная цена и недорого",
          "Одна компания",
          "Отчёты онлайн"
        ]}
        subtitle="Хватит волноваться, время жить"
      />
    </Layout>
    </>
  );
}
