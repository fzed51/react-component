import type { InputHTMLAttributes } from 'react';

export type InputTextSize = 'sm' | 'md' | 'lg';
export type InputTextState = 'default' | 'error' | 'success';

export interface InputTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Variante d'état */
  state?: InputTextState;
  /** Taille du champ */
  size?: InputTextSize;
}
