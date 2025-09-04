import { useState } from 'react';
import SizeSelector from '../SizeSelector/SizeSelector';
import OrderButton from '../OrderButton/OrderButton';
import ProductSpecs from '../ProductSpecs/ProductSpecs';
import ProductEquipment from '../ProductEquipment/ProductEquipment';
import ContactForm from '../ContactForm/ContactForm';
import Modal from '../Modal/Modal';
import styles from './ProductInfo.module.css';

export default function ProductInfo({ project }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const currentPrice = project?.sizes?.[selectedSize]?.price || 0;
  const formattedPrice = currentPrice.toLocaleString('ru-RU');

  const handleOrderClick = () => {
    setShowContactForm(true);
  };

  const handleCloseModal = () => {
    setShowContactForm(false);
  };

  // Глобальная функция для закрытия формы
  if (typeof window !== 'undefined') {
    window.closeContactFormProductInfo = () => {
      setShowContactForm(false);
    };
  }

  const currentSize = project?.sizes?.[selectedSize];
  const productInfo = {
    name: project?.name || '',
    size: currentSize?.area || '',
    dimensions: currentSize?.dimensions || '',
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

      <Modal isOpen={showContactForm} onClose={handleCloseModal}>
        <ContactForm
          title="Заказать проект"
          source="Каталог проектов"
          productInfo={productInfo}
        />
      </Modal>

      <ProductSpecs specs={project.specs} />

      <ProductEquipment equipment={project.equipment} />
    </div>
  );
}