// Утилита для очистки нежелательных H3 заголовков
export const cleanupUnwantedHeadings = () => {
  if (typeof window === 'undefined') return;

  const unwantedTexts = [
    'Search',
    '1. HTML (index.html)',
    '2. CSS (styles.css)', 
    '3. JavaScript (script.js)',
    'Пояснение:',
    'Объяснение изменений:',
    'Что изменилось:',
    'Внесенные изменения:',
    'HTML',
    'CSS', 
    'JavaScript',
    'Объяснение',
    'Практические шаги:',
    'Использование PHP для редиректов',
    'Объяснение кода:',
    'Настройка в .htaccess',
    'Итог',
    'Vision',
    'Загрузить файл',
    'Пригласите друзей и заработайте кредиты'
  ];

  const removeUnwantedHeadings = () => {
    const h3Elements = document.querySelectorAll('h3');
    
    h3Elements.forEach(h3 => {
      const text = h3.textContent?.trim();
      if (text && unwantedTexts.includes(text)) {
        h3.remove();
      }
    });
  };

  // Запускаем очистку при загрузке
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeUnwantedHeadings);
  } else {
    removeUnwantedHeadings();
  }

  // Наблюдаем за изменениями DOM
  const observer = new MutationObserver(() => {
    removeUnwantedHeadings();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};