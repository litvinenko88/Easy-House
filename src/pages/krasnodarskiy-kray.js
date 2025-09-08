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
      title="Модульные дома под ключ в Краснодарском крае | Строительство домов | модульных | каркасных домов"
      description="Строительство 🔨 модульных и каркасных домов под ключ 🔑 в Краснодарском крае | Быстровозводимые дома недорого | 👷 Строительство домов doorhan | Гарантия и доставка дома в Краснодарском крае"
      keywords="модульные дома под ключ, модульные дома цена, модульные дома купить, модульные дома Краснодарский край, модульные дома проекты, модульные дома стоимость, модульные дома производство, модульные дома готовые, модульные дома недорого, модульные дома с гарантией">
      <Hero
        title={
          <>
            Модульные дома под ключ в{" "}
            <span style={{ color: "#ff6b35" }}>Краснодарском крае</span>
          </>
        }
        titleSub=""
        advantages={[
          "Строим на любых участках",
          "Учитываем особенности региона",
          "Полностью готов через 30 дней",
          "Стоимость от 855 000₽",
        ]}
      />
    </Layout>
    </>
  );
}
