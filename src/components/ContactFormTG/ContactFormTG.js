import { useState, useEffect } from 'react';
import styles from './ContactFormTG.module.css';

const ContactFormTG = ({ isOpen, onClose, title = "Свяжитесь с нами", source = "Неизвестный блок", productInfo = null, projectPDF = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
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
    if (!phone || phone.length < 5) return 'Введите номер телефона';
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phone)) return 'Введите корректный номер телефона';
    return '';
  };

  const validateName = (name) => {
    if (!name.trim()) return 'Введите ваше имя';
    if (name.trim().length < 2) return 'Имя должно содержать минимум 2 символа';
    if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(name.trim())) return 'Имя может содержать только буквы, пробелы и дефисы';
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
    } else if (name === 'name') {
      setFormData({ ...formData, [name]: value });
      const error = validateName(value);
      setNameError(error);
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

  const sendToTelegram = async (data) => {
    const botToken = '8120824235:AAGEqe_EUGsJJEMHENHHzEdTwNiqxBv_61Y';
    const chatIds = ['682859146'];
    
    const pageTitle = document.title || 'Неизвестная страница';
    
    let message = `🏠 Новая заявка с сайта Easy House\n\n` +
      `👤 Имя: ${data.name}\n` +
      `📞 Телефон: ${data.phone}\n` +
      `📍 Источник: ${data.source}\n`;
    
    if (data.productInfo) {
      message += `\n🏠 Информация о товаре:\n` +
        `• Название: ${data.productInfo.name}\n` +
        `• Площадь: ${data.productInfo.size}\n` +
        `• Размеры: ${data.productInfo.dimensions}\n` +
        `• Цена: ${data.productInfo.price.toLocaleString('ru-RU')} руб.\n`;
    }
    
    message += `\n📄 Страница: ${pageTitle}\n` +
      `🔗 URL: ${window.location.href}\n` +
      `🕐 Время: ${new Date().toLocaleString('ru-RU')}`;
    
    // Отправляем сообщение
    setUploadStatus('Отправка данных...');
    setUploadProgress(25);
    
    const messagePromises = chatIds.map(chatId => 
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      })
    );
    
    const messageResponses = await Promise.all(messagePromises);
    const messageSuccess = messageResponses.some(response => response.ok);
    
    setUploadProgress(50);
    
    // Отправляем PDF файл, если он есть
    if (data.projectPDF && messageSuccess) {
      setUploadStatus('Отправка PDF файла...');
      setUploadProgress(75);
      
      const pdfPromises = chatIds.map(chatId => {
        const pdfFormData = new FormData();
        pdfFormData.append('chat_id', chatId);
        pdfFormData.append('document', data.projectPDF, 'Проект_дома.pdf');
        pdfFormData.append('caption', '📄 Проект дома в 2D виде');
        
        return fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
          method: 'POST',
          body: pdfFormData
        });
      });
      
      await Promise.all(pdfPromises);
    }
    
    setUploadStatus('Завершение...');
    setUploadProgress(100);
    
    return messageSuccess;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let hasErrors = false;
    
    const nameValidationError = validateName(formData.name);
    if (nameValidationError) {
      setNameError(nameValidationError);
      hasErrors = true;
    } else {
      setNameError('');
    }
    
    const phoneValidationError = validatePhone(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      hasErrors = true;
    } else {
      setPhoneError('');
    }
    
    if (!formData.consent) {
      setConsentError(true);
      hasErrors = true;
    } else {
      setConsentError(false);
    }
    
    if (hasErrors) {
      return;
    }
    
    setIsSubmitting(true);
    setUploadProgress(0);
    setUploadStatus('Подготовка...');

    try {
      const success = await sendToTelegram({ ...formData, source, productInfo, projectPDF });
      if (success) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Короткая задержка
        setIsSuccess(true);
        setFormData({ name: '', phone: '', consent: false });
        setNameError('');
        setPhoneError('');
        setConsentError(false);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        alert('Ошибка отправки. Попробуйте еще раз.');
      }
    } catch (error) {
      alert('Ошибка отправки. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
      setUploadStatus('');
    }
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
                  className={`${styles.input} ${nameError ? styles.inputError : ''}`}
                  placeholder=" "
                />
                <label className={styles.label}>Ваше имя</label>
                {nameError && <div className={styles.errorText}>{nameError}</div>}
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
              
              {isSubmitting ? (
                <div className={styles.progressContainer}>
                  <div className={styles.progressText}>
                    {uploadStatus}
                  </div>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className={styles.progressPercent}>
                    {uploadProgress}%
                  </div>
                  <div className={styles.warningText}>
                    Не закрывайте окно до завершения отправки
                  </div>
                </div>
              ) : (
                <button type="submit" className={styles.submitButton}>
                  Отправить заявку
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactFormTG;