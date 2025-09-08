import Layout from "../components/Layout/Layout";
import Hero from "../components/Hero/Hero";
import ProblemSolution from "../components/ProblemSolution/ProblemSolution";
import Features from "../components/Features/Features";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import VideoReviews from "../components/VideoReviews";
import VirtualTour from "../components/VirtualTour/VirtualTour";
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
      <ProblemSolution
        title={
          <>
            Строительство дома - это сложно? <span style={{ color: "#ff6b35" }}>Мы превратили сложность в результат</span>
          </>
        }
        problems={[
          "Сложности с наймом подрядчиков",
          "Климатические особенности региона",
          "Постоянный рост сметы",
          "Долгие сроки строительства",
        ]}
        solutions={[
          "Только своя бригада",
          "Дома, адаптированные под климат Ставрополья",
          "Фиксированная цена",
          "Готовый дом за 30 дней",
        ]}
      />
      <Bestsellers />
      <VideoReviews showViewAllButton={true} />
      <Features 
        title="Ваш дом укомплектован всем необходимым"
        features={[
          {
            id: 1,
            title: "Надежная защита и современный вид",
            description: "Прочная односкатная крыша с мягкой кровлей гарантирует абсолютную герметичность и устойчивость к любым осадкам, придавая дому стильный и завершенный облик.",
            image: "/images/communications/1.webp"
          },
          {
            id: 2,
            title: "Прочность, которая не подведет",
            description: "Идеальная геометрия и долговечность обеспечены каркасом из строганного бруса камерной сушки, который не ведет и не деформируется со временем.",
            image: "/images/communications/2.webp"
          },
          {
            id: 3,
            title: "Тепло и тишина в любое время года",
            description: "Полный контур эффективного утеплителя Технониколь создает комфортный микроклимат зимой и летом, обеспечивая отличную тепло- и шумоизоляцию.",
            image: "/images/communications/3.webp"
          },
          {
            id: 4,
            title: "Готовое решение или свобода выбора",
            description: "Прочное и ровное основание из OSB уже с финишным покрытием или под готово под вашу чистовую отделку — решать вам.",
            image: "/images/communications/4.webp"
          },
          {
            id: 5,
            title: "Уютная и экологичная атмосфера",
            description: "Внутренняя отделка из натуральной сосны создает здоровый микроклимат и неповторимую атмосферу тепла и уюта для вашей жизни.",
            image: "/images/communications/5.webp"
          },
          {
            id: 6,
            title: "Стильный экстерьер и долговечность",
            description: "Эстетика и практичность: классическая красота имитации бруса в сочетании с современной надежностью профлиста.",
            image: "/images/communications/6.webp"
          },
          {
            id: 7,
            title: "Прочное и проверенное основание",
            description: "Надежный свайный фундамент с обвязкой обеспечивает устойчивость на любом грунте без долгих подготовительных работ.",
            image: "/images/communications/7.webp"
          },
          {
            id: 8,
            title: "Тепло, свет и экономия",
            description: "Энергоэффективные окна с шестикамерным профилем сохраняют тепло, защищают от шума и позволяют экономить на отоплении.",
            image: "/images/communications/8.webp"
          },
          {
            id: 9,
            title: "Безопасность и защита от холода",
            description: "Входная дверь с терморазрывом предотвращает сквозняки и появление наледи, надежно сохраняя тепло в доме.",
            image: "/images/communications/9.webp"
          },
          {
            id: 10,
            title: "Горячая вода в любое время",
            description: "Вместительный 80-литровый бойлер обеспечит вас достаточным запасом горячей воды для всех ежедневных нужд.",
            image: "/images/communications/10.webp"
          },
          {
            id: 11,
            title: "Комфортное тепло в каждой комнате",
            description: "Современные конвекторы быстро и равномерно прогревают воздух в помещении, создавая комфортную температуру.",
            image: "/images/communications/11.webp"
          },
          {
            id: 12,
            title: "Полная готовность к комфортной жизни",
            description: "Вся необходимая сантехника и электрика (от розеток до автоматов) для полноценного проживания сразу после заселения.",
            image: "/images/communications/12.webp"
          }
        ]}
      />
      <VirtualTour 
        title="Оцените свое будущее уже сегодня"
        description="Мечтаете прикинуть планировку, расставить мебель и представить жизнь в доме? Приглашаем на виртуальный тур по нашему выставленному образцу для ПМЖ. Пройдитесь по готовым решениям, изучите нюансы и ощутите атмосферу нового жилья — еще до старта строительства."
      />
    </Layout>
  );
}
