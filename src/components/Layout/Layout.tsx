import Head from 'next/head'
import Header from '../Header/Header'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export default function Layout({ children, title = 'Easy House', description = 'Система управления умным домом' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="модульный дом под ключ, модульный дом цена, купить модульный дом, готовый модульный дом, производство модульных домов, модульный дом с отделкой, модульный дом с коммуникациями" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  )
}