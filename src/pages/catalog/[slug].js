import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { projectsData } from '../../data/projectsData';

export default function CatalogDetail({ project, slug: propSlug }) {
  const router = useRouter();
  const { slug } = router.query;

  const sanitizedSlug = propSlug || (typeof slug === 'string' ? slug.replace(/[^a-zA-Z0-9-_]/g, '') : '');

  const currentProject = project || projectsData[sanitizedSlug];

  if (!currentProject) {
    return (
      <Layout>
        <Head>
          <title>Проект не найден</title>
          <meta name="description" content="Запрашиваемый проект модульного дома не найден." />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <Breadcrumbs />
        <main style={{ 
          padding: 'var(--spacing-3xl)', 
          textAlign: 'center', 
          color: 'var(--color-gray)',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
            🚫 Проект не найден
          </h1>
          <p style={{ marginBottom: '2rem', maxWidth: '500px' }}>
            Извините, запрашиваемый проект модульного дома не найден.
          </p>
          <a 
            href="/catalog" 
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--color-accent)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            Перейти в каталог
          </a>
        </main>
      </Layout>
    );
  }

  const currentPrice = currentProject?.sizes?.[0]?.price || 0;
  const formattedPrice = currentPrice.toLocaleString('ru-RU');

  return (
    <Layout>
      <Head>
        <title>{currentProject.name} - модульный дом от {formattedPrice} руб | Easy House</title>
        <meta name="description" content={`Модульный дом ${currentProject.name} от ${formattedPrice} руб. Подробные характеристики, фото, чертежи и комплектация.`} />
        <meta name="keywords" content={`${currentProject.name}, модульный дом, цена, характеристики, купить`} />
        <link rel="canonical" href={`https://house-modular.ru/catalog/${sanitizedSlug}`} />
        <meta property="og:title" content={`${currentProject.name} - модульный дом от {formattedPrice} руб | Easy House`} />
        <meta property="og:description" content={`Модульный дом ${currentProject.name} от ${formattedPrice} руб. Подробные характеристики, фото, чертежи и комплектация.`} />
        <meta property="og:url" content={`https://house-modular.ru/catalog/${sanitizedSlug}`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={`https://house-modular.ru${currentProject.images?.[0] || '/images/default-house.jpg'}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": currentProject.name,
            "description": `Модульный дом ${currentProject.name}. Подробные характеристики, фото и комплектация.`,
            "image": currentProject.images?.map(img => `https://house-modular.ru${img}`) || [],
            "brand": {
              "@type": "Brand",
              "name": "Easy House"
            },
            "category": "Модульные дома",
            "offers": {
              "@type": "Offer",
              "price": currentPrice,
              "priceCurrency": "RUB",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Easy House",
                "url": "https://house-modular.ru"
              }
            }
          })}
        </script>
      </Head>

      <Breadcrumbs />
      <ProductDetail project={currentProject} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(projectsData).map((slug) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const project = projectsData[slug];

  if (!project) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      project,
      slug
    }
  };
}