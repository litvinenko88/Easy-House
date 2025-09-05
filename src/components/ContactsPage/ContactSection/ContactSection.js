import { useState } from 'react';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [consentError, setConsentError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return '';
    if (!emailRegex.test(email)) return 'Некорректный формат email';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'email') {
      setFormData({ ...formData, [name]: value });
      const error = validateEmail(value);
      setEmailError(error);
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
    
    const emailValidationError = validateEmail(formData.email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }
    
    if (!formData.consent) {
      setConsentError(true);
      return;
    }
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    setConsentError(false);
    setIsSubmitting(true);

    const message = `📬 Новое сообщение с сайта

👤 Имя: ${formData.name}
📧 Email: ${formData.email}
📍 Источник: страница контактов

💬 Сообщение:
${formData.message}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot8498114010:AAFcJmkf9AOaA2p6xUgaQ0edyNJPOIgY2DI/sendMessage`, {
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
        setFormData({ name: '', email: '', message: '', consent: false });
        setEmailError('');
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
                    placeholder=" "
                  />
                  <label className={styles.label}>Ваше имя</label>
                </div>
                
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`${styles.input} ${emailError ? styles.inputError : ''}`}
                    placeholder=" "
                  />
                  <label className={styles.label}>Email</label>
                  {emailError && <div className={styles.errorText}>{emailError}</div>}
                </div>
                
                <div className={styles.inputGroup}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className={styles.textarea}
                    rows="3"
                    placeholder=" "
                  ></textarea>
                  <label className={styles.label}>Сообщение</label>
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