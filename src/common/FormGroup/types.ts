import type { HTMLAttributes, ReactNode } from "react";

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Message d'erreur affiché sous le champ */
  error?: string;
  /** Message d'aide affiché sous le champ */
  hint?: string;
  /**
   * Identifiant du champ associé. Utilisé pour générer les `id` des messages
   * (`{fieldId}-error` / `{fieldId}-hint`) à relier via `aria-describedby`.
   */
  fieldId?: string;
}
