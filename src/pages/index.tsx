import Layout from '../components/Layout/Layout'
import Hero from '../components/Hero'
import ProblemSolution from '../components/ProblemSolution'
import Bestsellers from '../components/Bestsellers/Bestsellers'
import VideoReviews from '../components/VideoReviews'
import Features from '../components/Features'
import VirtualTour from '../components/VirtualTour'
import ProductionProcess from '../components/ProductionProcess'
import ProjectConstructor from '../components/ProjectConstructor'


export default function Home() {
  return (
    <Layout title="Строительство модульных домов под ключ 🔑 за 30 дней | От 650 000р за дом" description="Модульные дома от производителя под ключ за 30 дней 🔑| Строительство модульных домов для круглогодичного проживания с отделкой и коммуникациями | Доставка и гарантия | Собственное производство модульных домов">
      <Hero />
      <ProblemSolution/>
      <Bestsellers/>
      <VideoReviews showViewAllButton={true} />
      <Features />
      <VirtualTour />
      <ProductionProcess />
      <ProjectConstructor />
    </Layout>
  )
}