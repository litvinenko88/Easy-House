import { useState } from 'react'

interface ContactFormProps {
  title?: string
  source?: string
}

export default function ContactForm({ title = "Связаться с нами", source = "unknown" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.consent) {
      alert('Необходимо дать согласие на обработку персональных данных')
      return
    }
    
    if (!formData.name || !formData.phone) {
      alert('Пожалуйста, заполните обязательные поля')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          source: source + (formData.email ? ` - Email: ${formData.email}` : '') + (formData.message ? ` - Сообщение: ${formData.message}` : '')
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsSuccess(true)
        setFormData({ name: '', phone: '', email: '', message: '', consent: false })
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error('Ошибка отправки')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Произошла ошибка при отправке. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  if (isSuccess) {
    return (
      <div className="contact-form success">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Спасибо за заявку!</h3>
          <p>Мы свяжемся с вами в ближайшее время</p>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-form">
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ваше имя *"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон *"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Сообщение"
          value={formData.message}
          onChange={handleChange}
          rows={4}
        />
        <label>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          Согласен на обработку персональных данных
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Отправляем...' : 'Отправить'}
        </button>
      </form>
    </div>
  )
}