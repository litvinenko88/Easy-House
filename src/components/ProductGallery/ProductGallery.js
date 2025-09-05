import { useState } from 'react';
import styles from './ProductGallery.module.css';

export default function ProductGallery({ images, blueprints, projectName }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showBlueprints, setShowBlueprints] = useState(false);

  const displayImages = showBlueprints ? blueprints : images;

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        {displayImages.length > 0 && (
          <img 
            src={displayImages[currentImage]} 
            alt={`${projectName} - ${showBlueprints ? 'планировка' : 'фото'} ${currentImage + 1}`}
            width="600"
            height="400"
          />
        )}
      </div>
      
      <div className={styles.thumbnails}>
        {displayImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${projectName} - миниатюра ${index + 1}`}
            className={currentImage === index ? styles.active : ''}
            onClick={() => setCurrentImage(index)}
            width="150"
            height="100"
          />
        ))}
      </div>
      
      <div className={styles.viewToggle}>
        <button
          className={!showBlueprints ? styles.active : ''}
          onClick={() => { setShowBlueprints(false); setCurrentImage(0); }}
        >
          Фото
        </button>
        <button
          className={showBlueprints ? styles.active : ''}
          onClick={() => { setShowBlueprints(true); setCurrentImage(0); }}
        >
          Планировка
        </button>
      </div>
    </div>
  );
}