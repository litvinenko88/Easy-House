import { useState, useEffect } from 'react';
import ProductGallery from '../ProductGallery/ProductGallery';
import ProductInfo from '../ProductInfo/ProductInfo';
import styles from './ProductDetail.module.css';

export default function ProductDetail({ project, onOrderClick }) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => {
    if (isContactFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isContactFormOpen]);

  const handleOrderClick = (project, selectedSize) => {
    setIsContactFormOpen(true);
    if (onOrderClick) {
      onOrderClick(project, selectedSize);
    }
  };

  return (
    <main className={styles.container}>
      <ProductGallery 
        images={project.images}
        blueprints={project.blueprints}
        projectName={project.name}
      />
      
      <ProductInfo 
        project={project}
        onOrderClick={handleOrderClick}
      />

      {isContactFormOpen && (
        <div 
          className={styles.modal} 
          onClick={() => setIsContactFormOpen(false)}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalClose}
              onClick={() => setIsContactFormOpen(false)}
              aria-label="Закрыть форму"
            >
              ×
            </button>
            <div className={styles.contactForm}>
              <h2>Заказать дом</h2>
              <p>Форма заказа будет здесь</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}