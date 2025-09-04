import Head from 'next/head'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import FloatingContacts from '../FloatingContacts/FloatingContacts'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonical?: string
}

export default function Layout({ 
  children, 
  title = 'Easy House - Модульные дома под ключ', 
  description = 'Строительство модульных домов под ключ за 30 дней от 855 000₽. Собственное производство, доставка по России, гарантия качества. Заказать модульный дом с отделкой и коммуникациями.',
  keywords = 'модульный дом под ключ, модульный дом цена, купить модульный дом, готовый модульный дом, производство модульных домов, модульный дом с отделкой, модульный дом с коммуникациями, каркасный дом, дом за 30 дней, строительство домов',
  ogImage = '/images/og-image.jpg',
  canonical = 'https://easy-house.ru/'
}: LayoutProps) {
  const siteUrl = 'https://easy-house.ru'
  const fullTitle = title.includes('Easy House') ? title : `${title} | Easy House`
  
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonical} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteUrl}${ogImage}`} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Easy House" />
        <meta property="og:locale" content="ru_RU" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
        
        {/* Additional SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#df682b" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#df682b" />
        <link type="text/plain" rel="author" href="/humans.txt" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Easy House",
              "url": siteUrl,
              "logo": `${siteUrl}/logo.png`,
              "description": "Производство и строительство модульных домов под ключ",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "RU",
                "addressRegion": "Россия"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "Russian"
              },
              "sameAs": [
                "https://vk.com/easyhouse",
                "https://t.me/easyhouse"
              ]
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Easy House",
              "url": siteUrl,
              "description": description,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>
      <Header />
      <main id="main-content" role="main">{children}</main>
      <Footer />
      <ScrollToTop />
      <FloatingContacts />
    </>
  )
}