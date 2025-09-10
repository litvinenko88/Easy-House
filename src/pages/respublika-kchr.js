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
      <Bestsellers 
        title="Готовые проекты и цены домов"
        subtitle="Проверенные планировки, востребованные в горных условиях"
      />
      <VideoReviews 
        showViewAllButton={true}
        title="Видеоотчёты о сборке домов"
        subtitle="Убедитесь в надёжности конструкций и адаптации к горному климату."
      />
      <Features 
        title="Что включает цена дома в КЧР"
        subtitle="Усиленная конструкция для горной местности"
        features={[
          {
            id: 1,
            title: "Прочная скатная кровля с мягким покрытием",
            description: "гарантирует защиту от сильных осадков и ветров, обеспечивая эстетичный и надежный вид гостевого дома.",
            image: "/images/communications/1.webp"
          },
          {
            id: 2,
            title: "Стойкость к сейсмическим нагрузкам",
            description: "Идеальная геометрия и долговечность достигаются за счёт применения сухого строганного бруса, устойчивого к деформациям в сложных условиях в черкесске и карачаево-черкесской республике",
            image: "/images/communications/2.webp"
          },
          {
            id: 3,
            title: "Энергоэффективность в любую погоду",
            description: "Полный контур базальтового утеплителя создаёт стабильный микроклимат зимой и летом, обеспечивая отличное теплосбережение и тишину по доступной цене.",
            image: "/images/communications/3.webp"
          },
          {
            id: 4,
            title: "Вариативность внутренней отделки",
            description: "Прочное основание пола и перегородок из OSB с финишным покрытием или под вашу индивидуальную отделку - выбор за вами.",
            image: "/images/communications/4.webp"
          },
          {
            id: 5,
            title: "Экологичность и здоровый микроклимат",
            description: "Внутренняя отделка из натуральной древесины создаёт здоровую атмосферу и уют для круглогодичного проживания в деревянном доме.",
            image: "/images/communications/5.webp"
          },
          {
            id: 6,
            title: "Долговечность и адаптация к климату",
            description: "Сочетание эстетики имитации бруса и практичности профлиста обеспечивает стойкость к влаге и перепадам температур и длительный срок службы.",
            image: "/images/communications/6.webp"
          },
          {
            id: 7,
            title: "Быстрое и надежное основание",
            description: "Свайный фундамент с обвязкой обеспечивает устойчивость на сложном рельефе без длительных подготовительных работ строительство модульных домов.",
            image: "/images/communications/7.webp"
          },
          {
            id: 8,
            title: "Теплосбережение и шумозащита",
            description: "Энергоэффективные многокамерные окна сохраняют тепло, снижают затраты на отопление и защищают от шума.",
            image: "/images/communications/8.webp"
          },
          {
            id: 9,
            title: "Защита от холода и сквозняков",
            description: "Входная дверь с терморазрывом исключает промерзание и сквозняки, надёжно сохраняя тепло. Применяются негорючие материалы!",
            image: "/images/communications/9.webp"
          },
          {
            id: 10,
            title: "Непрерывное горячее водоснабжение",
            description: "Вместительный бойлер обеспечивает стабильный запас горячей воды для ежедневных нужд большой семьи.",
            image: "/images/communications/10.webp"
          },
          {
            id: 11,
            title: "Равномерный обогрев всех помещений",
            description: "Современные конвекторы быстро прогревают воздух, поддерживая комфортную температуру в каждой комнате.",
            image: "/images/communications/11.webp"
          },
          {
            id: 12,
            title: "Полная готовность к заселению",
            description: "Вся сантехника и электрика установлены и готовы к использованию сразу после монтажа дома под ключ. Это именно тот дом по выгодной цене",
            image: "/images/communications/12.webp"
          }
        ]}
      />
    </Layout>
  );
}
