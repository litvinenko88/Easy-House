import { useState, useMemo } from "react";
import styles from "./ProjectInfo.module.css";

const ProjectInfo = ({ project, onOrderClick }) => {
  const [selectedSize, setSelectedSize] = useState(0);

  const currentPrice = useMemo(() => {
    return project?.sizes?.[selectedSize]?.price || 0;
  }, [project, selectedSize]);

  const formattedPrice = useMemo(() => {
    return currentPrice.toLocaleString('ru-RU');
  }, [currentPrice]);

  if (!project) return null;

  return (
    <div className={styles.info}>
      <header>
        <h1 className={styles.title}>{project.name}</h1>
        <div className={styles.availability}>✓ В наличии</div>
      </header>

      <div className={styles.price}>
        {formattedPrice} руб.
      </div>

      <div className={styles.sizeSelector}>
        <label htmlFor="size-select">Размеры:</label>
        <select
          id="size-select"
          value={selectedSize}
          onChange={(e) => setSelectedSize(Number(e.target.value))}
        >
          {project.sizes.map((size, index) => (
            <option key={index} value={index}>
              {size.area} {size.dimensions}
            </option>
          ))}
        </select>
      </div>

      <button 
        className={styles.orderButton}
        onClick={() => onOrderClick?.(project, selectedSize)}
        type="button"
      >
        Заказать проект
      </button>

      <section className={styles.specs}>
        <h2>Технические характеристики</h2>
        <dl>
          <dt>Высота потолка:</dt>
          <dd>{project.specs?.ceiling || 'не указано'}</dd>
          <dt>Толщина стены:</dt>
          <dd>{project.specs?.wallThickness || 'не указано'}</dd>
          <dt>Утепление стены:</dt>
          <dd>{project.specs?.wallInsulation || 'не указано'}</dd>
          <dt>Толщина перегородки:</dt>
          <dd>{project.specs?.partitionThickness || 'не указано'}</dd>
          <dt>Утепление перегородки:</dt>
          <dd>{project.specs?.partitionInsulation || 'не указано'}</dd>
        </dl>
      </section>

      <section className={styles.equipment}>
        <h3>Базовая комплектация</h3>
        <ul>
          {project.equipment?.map((item, index) => (
            <li key={index}>{item}</li>
          )) || []}
        </ul>
      </section>
    </div>
  );
};

export default ProjectInfo;