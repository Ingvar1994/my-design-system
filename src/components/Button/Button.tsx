import type { ComponentProps, ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ComponentProps<'button'> {
  /** Visual hierarchy. "Type" in Figma. */
  variant?: ButtonVariant
  size?: ButtonSize
  /** Icon before the label. Sized to 16×16. */
  iconLeft?: ReactNode
  /** Icon after the label. Sized to 16×16. */
  iconRight?: ReactNode
}

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
