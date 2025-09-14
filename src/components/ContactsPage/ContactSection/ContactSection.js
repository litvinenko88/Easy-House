import { useState } from 'react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
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
    const phoneRegex = /^[\+]?[7|8]?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!phone) return '';
    if (!phoneRegex.test(phone)) return 'Некорректный формат телефона';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phone') {
      setFormData({ ...formData, [name]: value });
      const error = validatePhone(value);
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

    const pageTitle = document.title || 'Неизвестная страница';
    
    const message = `🏠 Новая заявка с сайта Easy House\n\n` +
      `👤 Имя: ${formData.name}\n` +
      `📞 Телефон: ${formData.phone}\n` +
      `📍 Источник: Страница контактов\n` +
      `📄 Страница: ${pageTitle}\n` +
      `🔗 URL: ${window.location.href}\n` +
      `🕐 Время: ${new Date().toLocaleString('ru-RU')}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot8120824235:AAGEqe_EUGsJJEMHENHHzEdTwNiqxBv_61Y/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '682859146',
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', phone: '', consent: false });
        setPhoneError('');
        setConsentError(false);
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      alert('Произошла ошибка при отправке. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Форма */}
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Свяжитесь с нами</h2>
            <p className={styles.formSubtitle}>
              Оставьте заявку и мы свяжемся с вами в ближайшее время
            </p>
            
            {isSuccess ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Спасибо за сообщение!</h3>
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
                    placeholder="Ваше имя"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`${styles.input} ${phoneError ? styles.inputError : ''}`}
                    placeholder="Телефон"
                  />
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
                    'Отправить сообщение'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Информационный блок */}
          <div className={styles.infoWrapper}>
            <div className={styles.infoContent}>
              <h3 className={styles.infoTitle}>Изучите наши проекты</h3>
              <p className={styles.infoText}>
                Вы можете посмотреть наши готовые проекты и видеообзоры на них
              </p>
              
              <div className={styles.buttonGroup}>
                <a href="/catalog" className={styles.actionButton}>
                  <div className={styles.buttonIcon}>🏠</div>
                  <span>Готовые проекты</span>
                </a>
                
                <a href="/otzyvy" className={styles.actionButton}>
                  <div className={styles.buttonIcon}>📹</div>
                  <span>Видеообзоры и отзывы</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}