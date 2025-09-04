import { useState } from 'react';
import SizeSelector from '../SizeSelector/SizeSelector';
import OrderButton from '../OrderButton/OrderButton';
import ProductSpecs from '../ProductSpecs/ProductSpecs';
import ProductEquipment from '../ProductEquipment/ProductEquipment';
import styles from './ProductInfo.module.css';

export default function ProductInfo({ project }) {
  const [selectedSize, setSelectedSize] = useState(0);
  
  const currentPrice = project?.sizes?.[selectedSize]?.price || 0;
  const formattedPrice = currentPrice.toLocaleString('ru-RU');

  const handleOrderClick = () => {
    // Кнопка заказа без функционала
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
    </div>
  );
}