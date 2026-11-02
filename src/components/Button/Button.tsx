import type { ComponentProps, MouseEventHandler, ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ComponentProps<'button'> {
  /**
   * Візуальна ієрархія дії, у Figma це властивість Type.
   * `primary` — головна дія екрана, `secondary` — другорядна, `ghost` — найменш помітна,
   * `danger` — дія, яку важко скасувати.
   */
  variant?: ButtonVariant
  /** Розмір кнопки: висота 36, 44 або 48 px. `secondary` на 2 px більша через рамку. */
  size?: ButtonSize
  /** Текст кнопки, у Figma це Label. Коротко назвіть дію: з нього читач екрана бере назву кнопки. */
  children?: ReactNode
  /** Іконка перед текстом у слоті 16×16 px. Декоративній іконці додайте `aria-hidden="true"`. */
  iconLeft?: ReactNode
  /** Іконка після тексту в слоті 16×16 px. Декоративній іконці додайте `aria-hidden="true"`. */
  iconRight?: ReactNode
  /** Вимикає кнопку: вона не реагує на натискання і випадає з порядку фокуса за Tab. */
  disabled?: boolean
  /** Викликається під час натискання мишею, дотиком, клавішею Enter або пробілом. */
  onClick?: MouseEventHandler<HTMLButtonElement>
  /** HTML-тип кнопки. Усередині форми вкажіть `submit`, щоб кнопка надсилала форму. */
  type?: 'button' | 'submit' | 'reset'
  /** Додатковий CSS-клас. Додається до класів компонента й не замінює їх. */
  className?: string
}

/**
 * Запускає дію на поточній сторінці. Ширина залежить від вмісту, тому фіксованої ширини кнопка не має.
 *
 * Решта атрибутів `<button>`, зокрема `aria-*`, `name` і `ref`, передаються напряму елементу.
 */
export function Button({
  variant = 'primary',
  size = 'sm',
  iconLeft,
  iconRight,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = ['button', `button--${variant}`, `button--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {iconLeft && <span className="button__icon">{iconLeft}</span>}
      {children}
      {iconRight && <span className="button__icon">{iconRight}</span>}
    </button>
  )
}
