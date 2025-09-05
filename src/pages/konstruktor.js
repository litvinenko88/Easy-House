'use client';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import ConstructorLoading from '../components/Constructor/ConstructorLoading/ConstructorLoading';

const ModularConstructor = dynamic(() => import('../components/Constructor/ModularConstructor/ModularConstructor'), {
  ssr: false,
  loading: () => <ConstructorLoading />
});

export default function ConstructorPage() {
  return (
    <>
      <Head>
        <title>Конструктор модульных домов | Easy House</title>
        <meta name="description" content="Интерактивный конструктор для проектирования модульных домов. Создайте свой идеальный дом с помощью нашего 3D конструктора." />
        <meta name="keywords" content="конструктор домов, модульные дома, проектирование дома, 3D конструктор" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Конструктор модульных домов | Easy House" />
        <meta property="og:description" content="Интерактивный конструктор для проектирования модульных домов" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://house-modular.ru/konstruktor" />
      </Head>
      <ModularConstructor />
    </>
  );
}