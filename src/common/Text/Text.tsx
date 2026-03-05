import clsx from 'clsx';
import './Text.css';
import type { TextProps, TextSize, TextVariant } from './types';

const variantClass: Record<TextVariant, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  inverse: 'text-inverse',
  error: 'text-error',
  success: 'text-success',
  warning: 'text-warning',
};

const sizeClass: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

/**
 * Paragraphe / texte courant du design system.
 */
export function Text({
  children,
  variant = 'primary',
  size = 'md',
  as: Tag = 'p',
  className = '',
  ...props
}: TextProps) {
  const classes = clsx('text-component', variantClass[variant], sizeClass[size], className);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const El = Tag as any;
  return (
    <El className={classes} {...props}>
      {children}
    </El>
  );
}
