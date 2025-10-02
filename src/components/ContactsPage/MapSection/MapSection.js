import { useEffect, useRef, useState } from 'react';
import styles from './MapSection.module.css';

export default function MapSection() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const initMap = () => {
      if (typeof window !== 'undefined' && window.ymaps && mapRef.current && !mapInstanceRef.current) {
        window.ymaps.ready(() => {
          try {
            const coordinates = [45.0448, 41.9691];
            
            mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
              center: coordinates,
              zoom: 16,
              controls: ['zoomControl', 'fullscreenControl']
            });

            const placemark = new window.ymaps.Placemark(coordinates, {
              balloonContentHeader: '<strong style="color: #df682b;">Easy House</strong>',
              balloonContentBody: `
                <div style="padding: 15px; font-family: Arial, sans-serif; line-height: 1.4;">
                  <p style="margin: 8px 0; color: #333; font-size: 14px;">
                    <strong>📍 Адрес:</strong><br>
                    г. Ставрополь, ул. Севрюкова, 58
                  </p>
                  <p style="margin: 8px 0; color: #333; font-size: 14px;">
                    <strong>🏭 Производственная база модульных домов</strong>
                  </p>
                  <p style="margin: 8px 0; color: #666; font-size: 13px;">
                    <strong>📞 Телефон:</strong> 8 (996) 417-90-01
                  </p>
                </div>
              `,
              hintContent: 'Easy House - производство модульных домов'
            }, {
              preset: 'islands#redHomeIcon',
              iconColor: '#df682b'
            });

            mapInstanceRef.current.geoObjects.add(placemark);
            setMapLoaded(true);
            
          } catch (error) {
            console.error('Ошибка инициализации Яндекс.Карт:', error);
            setMapError(true);
          }
        });
      }
    };

    const loadYandexMaps = () => {
      if (document.querySelector('script[src*="api-maps.yandex.ru"]')) {
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=c5bfbaa0-c71b-4913-a5e1-8e22a733a686&lang=ru_RU';
      script.async = true;
      
      script.onerror = () => {
        setMapError(true);
      };
      
      document.head.appendChild(script);
    };

    if (typeof window !== 'undefined') {
      if (!window.ymaps) {
        loadYandexMaps();
      }
    }

    const checkInterval = setInterval(() => {
      if (typeof window !== 'undefined' && window.ymaps) {
        clearInterval(checkInterval);
        initMap();
      }
    }, 500);
    
    const fallbackTimer = setTimeout(() => {
      clearInterval(checkInterval);
      if (typeof window !== 'undefined' && window.ymaps) {
        initMap();
      } else {
        setMapError(true);
      }
    }, 20000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(fallbackTimer);
      
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (e) {
          console.warn('Ошибка при уничтожении карты:', e);
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleRouteClick = () => {
    const url = `https://yandex.ru/maps/?rtext=~45.0448,41.9691&rtt=auto`;
    window.open(url, '_blank');
  };

  const handleGoogleRoute = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=45.0448,41.9691`;
    window.open(url, '_blank');
  };

  return (
    <section className={styles.mapSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Как нас найти</h2>
        
        <div className={styles.mapContainer}>
          <div 
            ref={mapRef} 
            className={styles.map}
            style={{ width: '100%', height: '100%' }}
          >
            {(!mapLoaded && !mapError) && (
              <div className={styles.mapPlaceholder}>
                <div className={styles.placeholderContent}>
                  <div className={styles.placeholderIcon}>📍</div>
                  <h3>Наш адрес</h3>
                  <p>г. Ставрополь, ул. Севрюкова, 58</p>
                  <p>Производственная база Easy House</p>
                  <div className={styles.loadingText}>Загрузка карты...</div>
                </div>
              </div>
            )}
            
            {mapError && (
              <div className={styles.mapPlaceholder}>
                <div className={styles.placeholderContent}>
                  <div className={styles.placeholderIcon}>⚠️</div>
                  <h3>Карта временно недоступна</h3>
                  <p>г. Ставрополь, ул. Севрюкова, 58</p>
                  <p>Производственная база Easy House</p>
                  <div className={styles.errorText}>
                    Используйте кнопки ниже для построения маршрута
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className={styles.mapInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoHeader}>
                <div className={styles.infoIcon}>📍</div>
                <h3>Наш адрес</h3>
              </div>
              <div className={styles.infoContent}>
                <p><strong>г. Ставрополь, ул. Севрюкова, 58</strong></p>
                <p>Производственная база Easy House</p>
              </div>
              <div className={styles.infoActions}>
                <button onClick={handleRouteClick} className={styles.routeBtn}>
                  Яндекс.Карты
                </button>
                <button onClick={handleGoogleRoute} className={styles.routeBtn}>
                  Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.additionalInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.itemIcon}>🚗</div>
              <h4>На автомобиле</h4>
              <p>Бесплатная парковка на территории</p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.itemIcon}>🚌</div>
              <h4>Общественный транспорт</h4>
              <p>Автобусы №15, 22 до остановки "Севрюкова"</p>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.itemIcon}>🏭</div>
              <h4>Производство</h4>
              <p>Экскурсии по производству по записи</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}