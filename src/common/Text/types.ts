import type { HTMLAttributes, ReactNode } from 'react';

export type TextVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'error'
  | 'success'
  | 'warning';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg';
export type TextAs = 'p' | 'span' | 'div' | 'li';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Variante de couleur */
  variant?: TextVariant;
  /** Taille du texte */
  size?: TextSize;
  /** Élément HTML à utiliser */
  as?: TextAs;
}
