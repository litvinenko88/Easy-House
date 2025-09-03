import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, onClick, type = 'button', variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}