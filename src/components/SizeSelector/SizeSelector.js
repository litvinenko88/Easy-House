import styles from './SizeSelector.module.css';

export default function SizeSelector({ sizes, selectedSize, onSizeChange }) {
  return (
    <div className={styles.sizeSelector}>
      <label>Размеры:</label>
      <select 
        value={selectedSize} 
        onChange={(e) => onSizeChange(Number(e.target.value))}
      >
        {sizes.map((size, index) => (
          <option key={index} value={index}>
            {size.area} {size.dimensions}
          </option>
        ))}
      </select>
    </div>
  );
}