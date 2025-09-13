import { useState, useEffect } from 'react';
import styles from './ContactFormTG.module.css';

const ContactFormTG = ({ isOpen, onClose, title = "Свяжитесь с нами" }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [consentError, setConsentError] = useState(false);

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

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phone) return '';
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Некорректный формат телефона';
    return '';
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length === 1 && cleaned !== '7') return `+7 (${cleaned}`;
    if (cleaned.length === 1 && cleaned === '7') return '+7';
    if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)}`;
    if (cleaned.length <= 7) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
    if (cleaned.length <= 9) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhone(value);
      setFormData({ ...formData, [name]: formattedPhone });
      const error = validatePhone(formattedPhone);
      setPhoneError(error);
    } else {
      setFormData({ 
        ...formData, 
        [name]: type === 'checkbox' ? checked : value 
      });
      if (name === 'consent' && checked) {
        setConsentError(false);
      }
    }
  };

  const handlePhoneFocus = () => {
    if (!formData.phone) {
      setFormData({ ...formData, phone: '+7 (' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let hasErrors = false;
    
    const phoneValidationError = validatePhone(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      hasErrors = true;
    }
    
    if (!formData.consent) {
      setConsentError(true);
      hasErrors = true;
    } else {
      setConsentError(false);
    }
    
    if (!formData.name || !formData.phone || hasErrors) {
      return;
    }
    
    setIsSubmitting(true);

    // Имитация отправки
    setTimeout(() => {
      setIsSuccess(true);
      setFormData({ name: '', phone: '', consent: false });
      setPhoneError('');
      setConsentError(false);
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>
            Оставьте заявку и мы свяжемся с вами в ближайшее время
          </p>
          
          {isSuccess ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h3>Спасибо за заявку!</h3>
              <p>Мы свяжемся с вами в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder=" "
                />
                <label className={styles.label}>Ваше имя</label>
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={handlePhoneFocus}
                  required
                  className={`${styles.input} ${phoneError ? styles.inputError : ''}`}
                  placeholder=" "
                />
                <label className={styles.label}>Телефон</label>
                {phoneError && <div className={styles.errorText}>{phoneError}</div>}
              </div>
              
              <div className={styles.checkboxGroup}>
                <label className={`${styles.checkboxLabel} ${consentError ? styles.error : ''}`}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                  />
                  <span className={styles.checkmark}></span>
                  <span className={styles.checkboxText}>
                    Согласен на обработку персональных данных
                  </span>
                </label>
                {consentError && <div className={styles.errorText}>Необходимо дать согласие на обработку данных</div>}
              </div>
              
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Отправляем...
                  </>
                ) : (
                  'Отправить заявку'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFormTG;