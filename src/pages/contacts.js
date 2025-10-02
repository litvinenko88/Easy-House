import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ContactHero from '../components/ContactsPage/ContactHero/ContactHero';
import QuickContacts from '../components/ContactsPage/QuickContacts/QuickContacts';
import WorkingHours from '../components/ContactsPage/WorkingHours/WorkingHours';
import ContactSection from '../components/ContactsPage/ContactSection/ContactSection';
import MapSection from '../components/ContactsPage/MapSection/MapSection';
import SocialLinks from '../components/ContactsPage/SocialLinks/SocialLinks';
import CompanyInfo from '../components/ContactsPage/CompanyInfo/CompanyInfo';
import styles from './contacts.module.css';

export default function Contacts() {
  return (
    <Layout>
      <Head>
        <title>Контакты - модульные дома | Телефон, адрес, время работы</title>
        <meta name="description" content="Контакты компании. Телефон 8(996)417-90-01, адрес в Ставрополе, время работы. Свяжитесь с нами для заказа модульного дома." />
        <meta name="keywords" content="контакты, телефон, адрес, связь, консультация, заказ модульного дома, Ставрополь" />
        <link rel="canonical" href="https://house-modular.ru/contacts" />
        <meta property="og:title" content="Контакты - модульные дома" />
        <meta property="og:description" content="Контакты компании. Телефон 8(996)417-90-01, адрес, время работы. Свяжитесь с нами для заказа модульного дома." />
        <meta property="og:url" content="https://house-modular.ru/contacts" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://house-modular.ru/images/contacts-preview.jpg" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Контакты",
            "description": "Контакты компании - производителя модульных домов",
            "url": "https://house-modular.ru/contacts",
            "mainEntity": {
              "@type": "Organization",
              "name": "House Modular",
              "telephone": "+7-996-417-90-01",
              "email": "info@easyhouse.ru",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Севрюкова, 58",
                "addressLocality": "Ставрополь",
                "addressCountry": "RU"
              }
            }
          })}
        </script>
      </Head>
      
      <Breadcrumbs />
      
      <main className={styles.contactsPage}>
        <ContactHero />
        <QuickContacts />
        <WorkingHours />
        <ContactSection />
        <MapSection />
        <SocialLinks />
        <CompanyInfo />
      </main>
    </Layout>
  );
}