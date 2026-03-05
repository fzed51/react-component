import clsx from 'clsx';
import './Card.css';
import type { CardProps } from './types';

/**
 * Cadre principal — surface blanche avec ombre et bords arrondis.
 * Utilisation : regrouper un contenu sémantique distinct.
 */
export function Card({ children, noPadding = false, className = '', ...props }: CardProps) {
  const classes = clsx('card', noPadding && 'card--no-padding', className);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
