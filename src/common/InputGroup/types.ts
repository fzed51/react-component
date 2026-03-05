import type { HTMLAttributes, ReactNode } from 'react';

export interface InputGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
  children: ReactNode;
  /** Élément affiché avant l'input (icône, texte…) */
  prefix?: ReactNode;
  /** Élément affiché après l'input (icône, bouton…) */
  suffix?: ReactNode;
}
