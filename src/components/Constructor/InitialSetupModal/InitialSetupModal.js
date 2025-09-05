'use client';

import { useState } from 'react';
import styles from './InitialSetupModal.module.css';

const HOUSE_SERIES = {
  arkhangelsk: {
    name: 'Серия "Архангельск"',
    icon: '🏠',
    models: [
      { id: 'arch-6x2.5', width: 6, height: 2.5, title: 'Новый Архангельск', area: 15, price: 450000 },
      { id: 'arch-7x2.5', width: 7, height: 2.5, title: 'Новый Архангельск', area: 17.5, price: 525000 },
      { id: 'arch-8x2.5', width: 8, height: 2.5, title: 'Новый Архангельск', area: 20, price: 600000 },
      { id: 'arch-6x5', width: 6, height: 5, title: 'Угловой Архангельск', area: 30, price: 900000 },
      { id: 'arch-7x5', width: 7, height: 5, title: 'Угловой Архангельск', area: 35, price: 1050000 },
      { id: 'arch-8x5', width: 8, height: 5, title: 'Угловой Архангельск', area: 40, price: 1200000 }
    ]
  },
  barn: {
    name: 'Серия "Барн"',
    icon: '🏘️',
    models: [
      { id: 'barn-6x2.5', width: 6, height: 2.5, title: 'Барнхаус', area: 15, price: 480000 },
      { id: 'barn-7x2.5', width: 7, height: 2.5, title: 'Барнхаус', area: 17.5, price: 560000 },
      { id: 'barn-8x2.5', width: 8, height: 2.5, title: 'Барнхаус', area: 20, price: 640000 },
      { id: 'barn-6x5', width: 6, height: 5, title: 'Барн с террасой', area: 30, price: 960000 },
      { id: 'barn-7x5', width: 7, height: 5, title: 'Барн с террасой', area: 35, price: 1120000 },
      { id: 'barn-8x5', width: 8, height: 5, title: 'Барн с террасой', area: 40, price: 1280000 }
    ]
  },
  multi: {
    name: 'Многомодульные решения',
    icon: '🏢',
    models: [
      { id: 'dvin-6x5', width: 6, height: 5, title: 'Двухмодульная Двинея', area: 30, price: 900000 },
      { id: 'dvin-7x5', width: 7, height: 5, title: 'Двухмодульная Двинея', area: 35, price: 1050000 },
      { id: 'dvin-8x5', width: 8, height: 5, title: 'Двухмодульная Двинея', area: 40, price: 1200000 },
      { id: 'barn4-7x10', width: 7, height: 10, title: 'Четырехмодульный Барн', area: 70, price: 2100000 },
      { id: 'barn4-8x10', width: 8, height: 10, title: 'Четырехмодульный Барн', area: 80, price: 2400000 }
    ]
  }
};

export default function InitialSetupModal({ onComplete }) {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [customMode, setCustomMode] = useState(false);
  const [customWidth, setCustomWidth] = useState(6);
  const [customHeight, setCustomHeight] = useState(2.5);
  const [lotWidth, setLotWidth] = useState(20);
  const [lotHeight, setLotHeight] = useState(15);
  const [selectedSeries, setSelectedSeries] = useState('arkhangelsk');

  const canProceed = (selectedHouse || customMode) && lotWidth > 0 && lotHeight > 0;

  const handleHouseSelect = (house) => {
    setSelectedHouse(house);
    setCustomMode(false);
  };

  const handleCustomMode = () => {
    setCustomMode(true);
    setSelectedHouse(null);
  };

  const handleProceed = () => {
    const houseData = customMode 
      ? {
          id: `custom-${Date.now()}`,
          width: customWidth,
          height: customHeight,
          area: customWidth * customHeight,
          price: (customWidth * customHeight) * 30000,
          title: `Модуль ${customWidth}×${customHeight}м`
        }
      : selectedHouse;

    onComplete({
      house: houseData,
      lotSize: { width: lotWidth, height: lotHeight }
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>Настройка конструктора</h2>
          <p>Выберите размер дома и участка для начала проектирования</p>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.section}>
            <h3>
              <span className={styles.sectionIcon}>📐</span>
              Размеры участка
            </h3>
            <div className={styles.lotInputs}>
              <div className={styles.inputGroup}>
                <label>Ширина участка (м)</label>
                <input 
                  type="number" 
                  value={lotWidth}
                  onChange={(e) => setLotWidth(Number(e.target.value))}
                  min="10" max="100"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Длина участка (м)</label>
                <input 
                  type="number" 
                  value={lotHeight}
                  onChange={(e) => setLotHeight(Number(e.target.value))}
                  min="10" max="100"
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>
              <span className={styles.sectionIcon}>🏠</span>
              Выбор дома
            </h3>
            
            <div className={styles.houseSelectionTabs}>
              <button 
                className={!customMode ? styles.active : ''}
                onClick={() => setCustomMode(false)}
              >
                Готовые проекты
              </button>
              <button 
                className={customMode ? styles.active : ''}
                onClick={handleCustomMode}
              >
                Свои размеры
              </button>
            </div>

            {!customMode ? (
              <div className={styles.presetHouses}>
                <div className={styles.seriesSelector}>
                  {Object.entries(HOUSE_SERIES).map(([key, series]) => (
                    <button
                      key={key}
                      className={selectedSeries === key ? styles.active : ''}
                      onClick={() => setSelectedSeries(key)}
                    >
                      <span className={styles.seriesIcon}>{series.icon}</span>
                      {series.name}
                    </button>
                  ))}
                </div>

                <div className={styles.housesGrid}>
                  {HOUSE_SERIES[selectedSeries].models.map(house => (
                    <div 
                      key={house.id}
                      className={`${styles.houseCard} ${selectedHouse?.id === house.id ? styles.selected : ''}`}
                      onClick={() => handleHouseSelect(house)}
                    >
                      <div className={styles.houseVisual}>
                        <div className={styles.houseIcon}>🏠</div>
                        <div className={styles.houseDimensions}>
                          {house.width}×{house.height}м
                        </div>
                      </div>
                      <div className={styles.houseInfo}>
                        <h4>{house.title}</h4>
                        <div className={styles.houseSpecs}>
                          <span className={styles.area}>{house.area}м²</span>
                          <span className={styles.price}>{(house.price / 1000).toFixed(0)}к ₽</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.customHouse}>
                <div className={styles.customVisual}>
                  <div className={styles.customIcon}>📏</div>
                  <h4>Индивидуальный размер</h4>
                </div>
                <div className={styles.customInputs}>
                  <div className={styles.inputGroup}>
                    <label>Ширина дома (м)</label>
                    <input 
                      type="number" 
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Number(e.target.value))}
                      min="2" max="20" step="0.5"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Длина дома (м)</label>
                    <input 
                      type="number" 
                      value={customHeight}
                      onChange={(e) => setCustomHeight(Number(e.target.value))}
                      min="2" max="30" step="0.5"
                    />
                  </div>
                </div>
                <div className={styles.customInfo}>
                  <div className={styles.infoItem}>
                    <span>Площадь:</span>
                    <strong>{(customWidth * customHeight).toFixed(1)}м²</strong>
                  </div>
                  <div className={styles.infoItem}>
                    <span>Примерная стоимость:</span>
                    <strong>{((customWidth * customHeight) * 30).toFixed(0)}к ₽</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.proceedBtn}
            onClick={handleProceed}
            disabled={!canProceed}
          >
            Перейти к конструктору
          </button>
          {!canProceed && (
            <p className={styles.warning}>
              Выберите размер дома и укажите размеры участка
            </p>
          )}
        </div>
      </div>
    </div>
  );
}