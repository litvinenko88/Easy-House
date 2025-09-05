import ProductGallery from '../ProductGallery/ProductGallery';
import ProductInfo from '../ProductInfo/ProductInfo';
import styles from './ProductDetail.module.css';

export default function ProductDetail({ project }) {
  return (
    <main className={styles.container}>
      <ProductGallery 
        images={project.images}
        blueprints={project.blueprints}
        projectName={project.name}
      />
      
      <ProductInfo project={project} />
    </main>
  );
}