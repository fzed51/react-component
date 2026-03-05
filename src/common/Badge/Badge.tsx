import clsx from 'clsx';
import './Badge.css';
import type { BadgeProps, BadgeVariant } from './types';

const variantClass: Record<BadgeVariant, string> = {
  default: 'badge--default',
  primary: 'badge--primary',
  success: 'badge--success',
  warning: 'badge--warning',
  error: 'badge--error',
  info: 'badge--info',
};

/**
 * Étiquette / pastille de statut.
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: BadgeProps) {
  const classes = clsx('badge', variantClass[variant], size === 'sm' && 'badge--sm', className);

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
