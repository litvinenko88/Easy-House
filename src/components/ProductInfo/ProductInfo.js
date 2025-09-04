import { useState } from 'react';
import SizeSelector from '../SizeSelector/SizeSelector';
import OrderButton from '../OrderButton/OrderButton';
import ProductSpecs from '../ProductSpecs/ProductSpecs';
import ProductEquipment from '../ProductEquipment/ProductEquipment';
import ContactForm from '../ContactForm/ContactForm';
import styles from './ProductInfo.module.css';

export default function ProductInfo({ project }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const currentPrice = project?.sizes?.[selectedSize]?.price || 0;
  const formattedPrice = currentPrice.toLocaleString('ru-RU');

  const handleOrderClick = () => {
    setShowContactForm(true);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
  };

  const productInfo = {
    name: project.name,
    size: project.sizes[selectedSize]?.area || '',
    dimensions: project.sizes[selectedSize]?.dimensions || '',
    price: currentPrice
  };

  return (
    <div className={styles.info}>
      <header>
        <h1>{project.name}</h1>
      </header>
      
      <div className={styles.availability}>✓ В наличии</div>
      
      <div className={styles.price}>
        {formattedPrice} руб.
      </div>

      <SizeSelector 
        sizes={project.sizes}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      <OrderButton onClick={handleOrderClick} />

      <ProductSpecs specs={project.specs} />

      <ProductEquipment equipment={project.equipment} />

      {showContactForm && (
        <div className={styles.modal} onClick={closeContactForm}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalClose}
              onClick={closeContactForm}
            >
              ×
            </button>
            <ContactForm 
              title="Заказать дом"
              source={`каталог - ${project.name}`}
              productInfo={productInfo}
            />
          </div>
        </div>
      )}
    </div>
  );
}