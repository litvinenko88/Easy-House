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

export default function RespublikaKCHR() {
  return (
    <Layout
      title="Модульные дома под ключ в Республике КЧР | Строительство домов | модульных | каркасных домов"
      description="Строительство 🔨 модульных и каркасных домов под ключ 🔑 в Республике КЧР | Быстровозводимые дома недорого | 👷 Строительство домов doorhan | Гарантия и доставка дома в Республике КЧР"
      keywords="модульные дома под ключ, модульные дома цена, модульные дома купить, модульные дома Республика КЧР, модульные дома проекты, модульные дома стоимость, модульные дома производство, модульные дома готовые, модульные дома недорого, модульные дома с гарантией">
      <Hero
        title={
          <>
            Модульные дома под ключ{" "}
            <span style={{ color: "#ff6b35" }}>в Черкесске и КЧР</span>
          </>
        }
        subtitle="Это готовый дом для постоянного проживания, ваш идеальный дом в горах"
        advantages={[
          "Строим на горном рельефе",
          "Учитываем климат и сейсмику",
          "Заезжайте через 30 дней",
          "Стоимость от 855 000₽",
        ]}
      />
      <ProblemSolution
        title={
          <>
            Строительство домов в горах КЧР — это риск?{" "}
            <span style={{ color: "#ff6b35" }}>Мы обеспечиваем надежность</span>
          </>
        }
        subtitle="Перестаньте сомневаться - начните жить сейчас! Доверьте нам строительство своего дома мечты."
        problems={[
          "Сложности с логистикой и рельефом",
          "Суровый климат и высокая влажность",
          "Непредвиденные расходы и задержки",
          "Годы ожидания вместо жизни",
        ]}
        solutions={[
          "Собственное производство и монтаж",
          "Конструкции, усиленные для сейсмики и ветров",
          "Честная смета без изменений",
          "Готовые модульные дома за 30 дней",
        ]}
        problemsTitle="Традиционное строительство"
        solutionsTitle="Каркасный дом под ключ"
        bottomText="Перестаньте сомневаться - начните жить сейчас! Доверьте нам строительство своего дома мечты."
      />
    </Layout>
  );
}
