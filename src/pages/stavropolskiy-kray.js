import Layout from '../components/Layout/Layout';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Bestsellers from '../components/Bestsellers/Bestsellers';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import VideoTestimonials from '../components/VideoTestimonials/VideoTestimonials';
import DeliveryInstallation from '../components/DeliveryInstallation/DeliveryInstallation';
import FAQReviews from '../components/FAQReviews/FAQReviews';

export default function StavropolskiyKray() {
  return (
    <Layout
      title="🏠 Модульные дома в Ставропольском крае | Easy House"
      description="Модульные дома в Ставропольском крае от производителя Easy House. Быстрое строительство, доступные цены, гарантия качества. Доставка и установка по всему региону."
      keywords="модульные дома Ставропольский край, быстровозводимые дома СК, каркасные дома Ставрополь, дома под ключ Ставропольский край"
    >
      <Hero 
        title="Модульные дома в Ставропольском крае"
        subtitle="Быстрое строительство качественных домов от производителя"
        regionSpecific={true}
      />
      <Features />
      <Bestsellers />
      <WhyChooseUs />
      <VideoTestimonials />
      <DeliveryInstallation />
      <FAQReviews />
    </Layout>
  );
}