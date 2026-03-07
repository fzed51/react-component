import type { HTMLAttributes, ReactNode } from "react";

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Message d'erreur affiché sous le champ */
  error?: string;
  /** Message d'aide affiché sous le champ */
  hint?: string;
}
