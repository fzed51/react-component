import clsx from 'clsx';
import './Button.css';
import type { ButtonProps, ButtonSize, ButtonVariant } from './types';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  ghost: 'btn--ghost',
  danger: 'btn--danger',
  outline: 'btn--outline',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg',
};

/**
 * Bouton du design system avec variantes de style et de taille.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const classes = clsx(
    'btn',
    variantClass[variant],
    sizeClass[size],
    fullWidth && 'btn--full-width',
    loading && 'btn--loading',
    className,
  );

  return (
    <button className={classes} disabled={disabled || loading} aria-busy={loading} {...props}>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
