import { useEffect } from 'react';
import ContactFormWithPDF from './ContactFormWithPDF';
import styles from './ContactFormModal.module.css';

const ContactFormModal = ({ 
  isOpen, 
  onClose, 
  projectInfo = null, 
  pdfBlob = null 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <ContactFormWithPDF
          title="Рассчитать проект"
          source="constructor"
          projectInfo={projectInfo}
          pdfBlob={pdfBlob}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default ContactFormModal;