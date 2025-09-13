import { useState } from 'react';
import styles from './ContactForm.module.css';

const ContactForm = ({ 
  title = "Оставьте заявку", 
  source = "unknown",
  className = "",
  productInfo = null
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [consentError, setConsentError] = useState(false);

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 0) return '';
    if (cleanPhone.length !== 11) return 'Телефон должен содержать 11 цифр';
    if (!cleanPhone.startsWith('7') && !cleanPhone.startsWith('8')) {
      return 'Телефон должен начинаться с +7 или 8';
    }
    return '';
  };

  const formatPhone = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.startsWith('8')) {
      return '+7' + cleanValue.slice(1);
    }
    if (cleanValue.startsWith('7')) {
      return '+' + cleanValue;
    }
    if (cleanValue.length > 0 && !cleanValue.startsWith('7') && !cleanValue.startsWith('8')) {
      return '+7' + cleanValue;
    }
    return cleanValue.length > 0 ? '+' + cleanValue : '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhone(value);
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
      const error = validatePhone(formattedPhone);
      setPhoneError(error);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
      if (name === 'consent' && checked) {
        setConsentError(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const phoneValidationError = validatePhone(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }
    
    if (!formData.consent) {
      setConsentError(true);
      return;
    }
    
    if (!formData.name || !formData.phone) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    setConsentError(false);
    setIsSubmitting(true);

    // Логика отправки удалена
    
    setTimeout(() => {
      setIsSuccess(true);
      setFormData({ name: '', phone: '', consent: false });
      setPhoneError('');
      setConsentError(false);
      setIsSubmitting(false);
      
      setTimeout(() => {
        setIsSuccess(false);
        if (typeof window !== 'undefined') {
          if (window.closeContactForm) {
            window.closeContactForm();
          }
          if (window.closeContactFormHero) {
            window.closeContactFormHero();
          }
          if (window.closeContactFormWhyChooseUs) {
            window.closeContactFormWhyChooseUs();
          }
          if (window.closeContactFormCatalog) {
            window.closeContactFormCatalog();
          }
          if (window.closeContactFormProjectInfo) {
            window.closeContactFormProjectInfo();
          }
          if (window.closeContactFormProductInfo) {
            window.closeContactFormProductInfo();
          }
        }
      }, 3000);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className={`${styles.form} ${styles.success} ${className}`}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h3>Спасибо за заявку!</h3>
          <p>Мы свяжемся с вами в ближайшее время</p>
        </div>
      </div>
    );
  }

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
      <h3 className={styles.title}>{title}</h3>
      
      <div className={styles.field}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ваше имя"
          className={styles.input}
          required
        />
      </div>

      <div className={styles.field}>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (999) 123-45-67"
          className={`${styles.input} ${phoneError ? styles.inputError : ''}`}
          required
        />
        {phoneError && <div className={styles.errorText}>{phoneError}</div>}
      </div>

      <div className={styles.checkbox}>
        <label className={`${styles.checkboxLabel} ${consentError ? styles.checkboxError : ''}`}>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          <span className={`${styles.checkmark} ${consentError ? styles.checkmarkError : ''}`}></span>
          <span className={styles.checkboxText}>
            Согласен на обработку персональных данных
          </span>
        </label>
        {consentError && <div className={styles.errorText}>Необходимо дать согласие на обработку данных</div>}
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className={styles.spinner}></span>
            Отправляем...
          </>
        ) : (
          'Отправить'
        )}
      </button>
    </form>
  );
};

export default ContactForm;