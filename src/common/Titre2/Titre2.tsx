import clsx from 'clsx';
import './Titre2.css';
import type { Titre2Props } from './types';

/**
 * Titre de section — correspond au `<h2>` du design system.
 */
export function Titre2({ children, className = '', ...props }: Titre2Props) {
  return (
    <h2 className={clsx('titre2', className)} {...props}>
      {children}
    </h2>
  );
}
