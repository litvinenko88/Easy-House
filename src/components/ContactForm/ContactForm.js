import { useState } from 'react';
import styles from './ContactForm.module.css';
const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '8498114010:AAFcJmkf9AOaA2p6xUgaQ0edyNJPOIgY2DI';
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '682859146';

const sendToTelegram = async (data) => {
  const message = `🏠 Новая заявка с сайта Easy House

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
📍 Источник: ${data.source}
⏰ Время: ${new Date().toLocaleString('ru-RU')}`;
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
    
    const result = await response.json();
    return { success: result.ok, data: result };
  } catch (error) {
    console.error('Telegram send error:', error);
    return { success: false, error: error.message };
  }
};

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

    let message = `🏠 Новая заявка с сайта

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
📍 Источник: ${source}`;
    
    if (productInfo) {
      message += `

🏡 Информация о доме:
🏷️ Название: ${productInfo.name}
📏 Размер: ${productInfo.size}${productInfo.dimensions ? ` (${productInfo.dimensions})` : ''}
💰 Цена: ${productInfo.price.toLocaleString('ru-RU')} руб.`;
    }
    
    message += `
⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    try {
      const formDataToSend = {
        name: formData.name,
        phone: formData.phone,
        source: source + (productInfo ? ` - Интерес к дому: ${productInfo.name} (${productInfo.size}, ${productInfo.price.toLocaleString('ru-RU')} руб.)` : '')
      };

      const result = await sendToTelegram(formDataToSend);
      
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', phone: '', consent: false });
        setPhoneError('');
        setConsentError(false);
        setTimeout(() => {
          setIsSuccess(false);
          // Закрываем форму через родительский компонент
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
      } else {
        throw new Error('Ошибка отправки в Telegram');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Произошла ошибка при отправке. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
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