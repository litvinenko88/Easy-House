import { useState } from 'react';
import styles from './ContactForm.module.css';

const TELEGRAM_BOT_TOKEN = '8498114010:AAFcJmkf9AOaA2p6xUgaQ0edyNJPOIgY2DI';
const TELEGRAM_CHAT_ID = '682859146';

const sendToTelegramWithFile = async (data, pdfBlob = null) => {
  let message = `🏠 Новая заявка с сайта Easy House

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
📍 Источник: ${data.source}`;

  if (data.projectInfo) {
    message += `

🏡 Информация о проекте:
🏷️ Название: ${data.projectInfo.name}
📏 Размеры дома: ${data.projectInfo.dimensions}
📐 Площадь: ${data.projectInfo.area}м²
🏞️ Участок: ${data.projectInfo.lotSize}
🧱 Стен: ${data.projectInfo.wallsCount}
🚪 Дверей: ${data.projectInfo.doorsCount}
🪟 Окон: ${data.projectInfo.windowsCount}`;
  }

  message += `
⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

  try {
    // Сначала отправляем текстовое сообщение
    const textResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
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

    const textResult = await textResponse.json();
    
    // Если есть PDF файл, отправляем его
    if (pdfBlob) {
      const formData = new FormData();
      formData.append('chat_id', TELEGRAM_CHAT_ID);
      formData.append('document', pdfBlob, 'floor-plan.pdf');
      formData.append('caption', '📋 План дома от клиента');

      const fileResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
        method: 'POST',
        body: formData
      });

      const fileResult = await fileResponse.json();
      return { success: textResult.ok && fileResult.ok, data: { text: textResult, file: fileResult } };
    }

    return { success: textResult.ok, data: textResult };
  } catch (error) {
    console.error('Telegram send error:', error);
    return { success: false, error: error.message };
  }
};

const ContactFormWithPDF = ({ 
  title = "Рассчитать проект", 
  source = "constructor",
  className = "",
  projectInfo = null,
  pdfBlob = null,
  onClose = null
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
  const [uploadProgress, setUploadProgress] = useState(0);

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
    setUploadProgress(0);

    try {
      const formDataToSend = {
        name: formData.name,
        phone: formData.phone,
        source: source,
        projectInfo: projectInfo
      };

      // Симуляция прогресса для лучшего UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      const result = await sendToTelegramWithFile(formDataToSend, pdfBlob);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (result.success) {
        setTimeout(() => {
          setIsSuccess(true);
          setFormData({ name: '', phone: '', consent: false });
          setPhoneError('');
          setConsentError(false);
          setTimeout(() => {
            setIsSuccess(false);
            if (onClose) {
              onClose();
            }
          }, 3000);
        }, 500);
      } else {
        throw new Error('Ошибка отправки в Telegram');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Произошла ошибка при отправке. Попробуйте еще раз.');
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  if (isSuccess) {
    return (
      <div className={`${styles.form} ${styles.success} ${className}`}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h3>Проект отправлен!</h3>
          <p>Мы получили ваш план и свяжемся с вами для расчета стоимости</p>
          {pdfBlob && <p className={styles.pdfNote}>📋 План дома прикреплен к заявке</p>}
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className={`${styles.form} ${className}`}>
        <div className={styles.uploadingState}>
          <div className={styles.progressContainer}>
            <div className={styles.circularProgress}>
              <svg className={styles.progressRing} width="80" height="80">
                <circle
                  className={styles.progressRingBackground}
                  stroke="#e5e7eb"
                  strokeWidth="6"
                  fill="transparent"
                  r="34"
                  cx="40"
                  cy="40"
                />
                <circle
                  className={styles.progressRingForeground}
                  stroke="#df682b"
                  strokeWidth="6"
                  fill="transparent"
                  r="34"
                  cx="40"
                  cy="40"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - uploadProgress / 100)}`}
                />
              </svg>
              <div className={styles.progressText}>{Math.round(uploadProgress)}%</div>
            </div>
          </div>
          <h3 className={styles.uploadingTitle}>Отправка планировки...</h3>
          <p className={styles.uploadingMessage}>Не закрывайте форму, идет отправка планировки</p>
        </div>
      </div>
    );
  }

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
      <h3 className={styles.title}>{title}</h3>
      
      {projectInfo && (
        <div className={styles.projectSummary}>
          <h4>Информация о проекте:</h4>
          <p><strong>{projectInfo.name}</strong></p>
          <p>Размеры: {projectInfo.dimensions}</p>
          <p>Площадь: {projectInfo.area}м²</p>
          {pdfBlob && <p className={styles.pdfAttached}>📋 План дома будет приложен</p>}
        </div>
      )}
      
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
        Отправить проект на расчет
      </button>
    </form>
  );
};

export default ContactFormWithPDF;