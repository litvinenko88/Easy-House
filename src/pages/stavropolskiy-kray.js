import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import VideoTestimonials from "../components/VideoTestimonials/VideoTestimonials";
import DeliveryInstallation from "../components/DeliveryInstallation/DeliveryInstallation";
import FAQReviews from "../components/FAQReviews/FAQReviews";

export default function StavropolskiyKray() {
  return (
    <Layout
      title="Модульные дома под ключ в Ставрополе и в Ставропольском крае | Строительство домов | модульных | каркасных домов"
      description="Строительство 🔨 модульных и каркасных домов под ключ 🔑 в Ставрополе и в Ставропольском крае  | Быстровозводимые дома недорого | 👷 Строительство домов doorhan | Гарантия и доставка дома в Ставрополе"
      keywords="модульные дома под ключ, модульные дома цена, модульные дома купить, модульные дома Ставропольский край, модульные дома проекты, модульные дома стоимость, модульные дома производство, модульные дома готовые, модульные дома недорого, модульные дома с гарантией">
      <Hero
        title={
          <>
            Модульные дома под ключ в{" "}
            <span style={{ color: "#ff6b35" }}>Ставрополе</span> и{" "}
            <span style={{ color: "#ff6b35" }}>Ставропольском крае</span>
          </>
        }
        titleSub=""
        advantages={[
          "Строим на любых участках",
          "Учитываем особенности региона",
          "До заезда — 30 дней",
          "Стоимость от 850 000₽",
        ]}
      />
    </Layout>
  );
}
