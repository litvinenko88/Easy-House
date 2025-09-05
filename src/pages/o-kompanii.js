import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import AboutHero from '../components/AboutHero/AboutHero';
import AboutContent from '../components/AboutContent/AboutContent';
import AboutStats from '../components/AboutStats/AboutStats';
import AboutVideo from '../components/AboutVideo/AboutVideo';
import AboutReviews from '../components/AboutReviews/AboutReviews';
import CompanyInfo from '../components/CompanyInfo/CompanyInfo';
import VideoReviews from '../components/VideoReviews/VideoReviews';

export default function OKompanii() {
  return (
    <Layout>
      <Head>
        <title>О компании Easy House - производитель модульных домов | 7 лет опыта</title>
        <meta
          name="description"
          content="Easy House - ведущий производитель модульных домов с 7-летним опытом. Собственное производство, немецкое оборудование, гарантия 5 лет. Более 800 реализованных проектов."
        />
        <meta
          name="keywords"
          content="о компании Easy House, производство модульных домов, производитель домов, немецкое оборудование, гарантия качества, опыт строительства"
        />
        <link rel="canonical" href="https://house-modular.ru/o-kompanii" />
        <meta
          property="og:title"
          content="О компании Easy House - производитель модульных домов | 7 лет опыта"
        />
        <meta
          property="og:description"
          content="Easy House - ведущий производитель модульных домов с 7-летним опытом. Собственное производство, немецкое оборудование, гарантия 5 лет."
        />
        <meta property="og:url" content="https://house-modular.ru/o-kompanii" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://house-modular.ru/images/about-company-preview.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="О компании Easy House - производство модульных домов" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="О компании Easy House - производитель модульных домов" />
        <meta name="twitter:description" content="Easy House - ведущий производитель модульных домов с 7-летним опытом. Собственное производство, немецкое оборудование." />
        <meta name="twitter:image" content="https://house-modular.ru/images/about-company-preview.jpg" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Easy House",
            "description": "Производитель модульных домов с 7-летним опытом. Собственное производство, немецкое оборудование, гарантия 5 лет.",
            "url": "https://house-modular.ru/o-kompanii",
            "logo": "https://house-modular.ru/images/logo.png",
            "foundingDate": "2017",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ул. Севрюкова, д. 94",
              "addressLocality": "Ставрополь",
              "addressRegion": "Ставропольский край",
              "postalCode": "355013",
              "addressCountry": "RU"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "Russian"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Главная",
                  "item": "https://house-modular.ru/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "О компании",
                  "item": "https://house-modular.ru/o-kompanii"
                }
              ]
            }
          })}
        </script>
      </Head>
      <Breadcrumbs />
      <main>
        <AboutHero />
        <AboutContent />
        <AboutStats />
        <AboutVideo />
        <AboutReviews />
        <VideoReviews showViewAllButton={true} />
        <CompanyInfo />
      </main>
    </Layout>
  );
}