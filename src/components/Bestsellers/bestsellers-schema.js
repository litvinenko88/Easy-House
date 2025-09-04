export const getBestsellersSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Наши бестселлеры - популярные модульные дома",
    "description": "Популярные модульные дома, которые выбирают наши клиенты",
    "numberOfItems": 6,
    "itemListElement": [
      {
        "@type": "Product",
        "position": 1,
        "name": "Новый Архангельск",
        "description": "Компактный и функциональный модульный дом для быстрого старта строительства модульных домов",
        "image": "/images/New_Arkhangelsk/1.jpg",
        "offers": {
          "@type": "Offer",
          "price": "855000",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Площадь",
            "value": "15-20 м²"
          },
          {
            "@type": "PropertyValue",
            "name": "Особенность",
            "value": "Базовая модель одного модуля"
          }
        ]
      },
      {
        "@type": "Product",
        "position": 2,
        "name": "Архангельск с террасой",
        "description": "Уютный дом с готовой террасой для отдыха на свежем воздухе",
        "image": "/images/Arkhangelsk_terrace/1.jpg",
        "offers": {
          "@type": "Offer",
          "price": "1075000",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Площадь",
            "value": "15 м² + терраса"
          },
          {
            "@type": "PropertyValue",
            "name": "Особенность",
            "value": "Модульный дом с открытой террасой"
          }
        ]
      },
      {
        "@type": "Product",
        "position": 3,
        "name": "Угловой Архангельск",
        "description": "Нестандартная планировка и больше полезного пространства в модели дома",
        "image": "/images/Angular_Arkhangelsk/1.jpg",
        "offers": {
          "@type": "Offer",
          "price": "1265000",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Площадь",
            "value": "30 м² (6x5)"
          },
          {
            "@type": "PropertyValue",
            "name": "Особенность",
            "value": "Угловая планировка, идеально подходящая для негабаритных участков"
          }
        ]
      },
      {
        "@type": "Product",
        "position": 4,
        "name": "Барн-хаус",
        "description": "Современный типовой каркасный дом в стиле барнхаус с высокими потолками",
        "image": "/images/Barnhouse/1.jpg",
        "offers": {
          "@type": "Offer",
          "price": "930000",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Площадь",
            "value": "35-40 м²"
          },
          {
            "@type": "PropertyValue",
            "name": "Особенность",
            "value": "Стиль Barnhouse"
          }
        ]
      },
      {
        "@type": "Product",
        "position": 5,
        "name": "Двухмодульная Двинея",
        "description": "Просторная планировка с чётким зонированием, идеально подходящая для загородного дома",
        "image": "/images/Two_module_Lane/1.jpg",
        "offers": {
          "@type": "Offer",
          "price": "1430000",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Площадь",
            "value": "30-40 м²"
          },
          {
            "@type": "PropertyValue",
            "name": "Особенность",
            "value": "Просторная планировка с возможностью использования винтовых свай"
          }
        ]
      },
      {
        "@type": "Product",
        "position": 6,
        "name": "Четырехмодульный Барн",
        "description": "Солидный дом с несколькими комнатами, доступный по выгодным ценам",
        "image": "/images/Four_Module_Barn/1.jpg",
        "offers": {
          "@type": "Offer",
          "price": "3130000",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock"
        },
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Площадь",
            "value": "70-80 м²"
          },
          {
            "@type": "PropertyValue",
            "name": "Особенность",
            "value": "Просторный дом для большой семьи"
          }
        ]
      }
    ]
  };
};