import type { HTMLAttributes, ReactNode } from 'react';

export type SubCardVariant = 'default' | 'subtle' | 'muted';

export interface SubCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Couleur de fond variante */
  variant?: SubCardVariant;
}
