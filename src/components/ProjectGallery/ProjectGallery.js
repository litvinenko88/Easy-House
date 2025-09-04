import { useState } from "react";
import styles from "./ProjectGallery.module.css";

const ProjectGallery = ({ images, blueprints, projectName }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showBlueprints, setShowBlueprints] = useState(false);

  const displayImages = showBlueprints ? blueprints : images;

  const handleToggleView = (isBlueprints) => {
    setShowBlueprints(isBlueprints);
    setCurrentImage(0);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img 
          src={displayImages[currentImage]} 
          alt={`${projectName} - ${showBlueprints ? 'планировка' : 'фото'} ${currentImage + 1}`}
          width="600"
          height="400"
        />
      </div>
      
      <div className={styles.thumbnails}>
        {displayImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${projectName} - миниатюра ${index + 1}`}
            className={currentImage === index ? styles.active : ""}
            onClick={() => setCurrentImage(index)}
            width="120"
            height="80"
          />
        ))}
      </div>
      
      <div className={styles.viewToggle}>
        <button
          className={!showBlueprints ? styles.active : ""}
          onClick={() => handleToggleView(false)}
          type="button"
        >
          Фото
        </button>
        <button
          className={showBlueprints ? styles.active : ""}
          onClick={() => handleToggleView(true)}
          type="button"
        >
          Планировка
        </button>
      </div>
    </div>
  );
};

export default ProjectGallery;