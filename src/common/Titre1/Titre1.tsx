import clsx from 'clsx';
import './Titre1.css';
import type { Titre1Props } from './types';

/**
 * Titre principal de page — correspond au `<h1>` du design system.
 */
export function Titre1({ children, className = '', ...props }: Titre1Props) {
  return (
    <h1 className={clsx('titre1', className)} {...props}>
      {children}
    </h1>
  );
}
