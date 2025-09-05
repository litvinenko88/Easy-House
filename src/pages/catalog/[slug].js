import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { projectsData } from '../../data/projectsData';

export default function CatalogDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const project = projectsData[slug];

  if (!project) {
    return (
      <Layout>
        <Head>
          <title>Проект не найден | Easy House</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <Breadcrumbs />
        <main style={{ 
          padding: 'var(--spacing-3xl)', 
          textAlign: 'center', 
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>Проект не найден</h1>
          <p>Запрашиваемый проект модульного дома не найден.</p>
          <a href="/catalog" style={{
            padding: '12px 24px',
            backgroundColor: 'var(--color-accent)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600'
          }}>
            Перейти в каталог
          </a>
        </main>
      </Layout>
    );
  }

  const currentPrice = project?.sizes?.[0]?.price || 0;
  const formattedPrice = currentPrice.toLocaleString('ru-RU');

  return (
    <Layout>
      <Head>
        <title>{project.name} - модульный дом от {formattedPrice} руб | Easy House</title>
        <meta name="description" content={`Модульный дом ${project.name} от ${formattedPrice} руб. Подробные характеристики, фото, чертежи и комплектация.`} />
        <link rel="canonical" href={`https://house-modular.ru/catalog/${slug}`} />
      </Head>
      <Breadcrumbs />
      <ProductDetail project={project} />
    </Layout>
  );
}