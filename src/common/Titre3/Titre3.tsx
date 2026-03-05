import clsx from 'clsx';
import './Titre3.css';
import type { Titre3Props } from './types';

/**
 * Titre de sous-section — correspond au `<h3>` du design system.
 */
export function Titre3({ children, className = '', ...props }: Titre3Props) {
  return (
    <h3 className={clsx('titre3', className)} {...props}>
      {children}
    </h3>
  );
}
