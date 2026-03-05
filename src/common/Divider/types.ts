import type { HTMLAttributes } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Orientation du séparateur */
  orientation?: 'horizontal' | 'vertical';
  /** Label central optionnel */
  label?: string;
}
