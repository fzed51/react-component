import type { ReactNode, SelectHTMLAttributes } from 'react';

export type SelectorSize = 'sm' | 'md' | 'lg';
export type SelectorState = 'default' | 'error' | 'success';

export interface SelectorProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  children: ReactNode;
  /** Variante d'état */
  state?: SelectorState;
  /** Taille du sélecteur */
  size?: SelectorSize;
  /** Texte de l'option par défaut non sélectionnable */
  placeholder?: string;
}
