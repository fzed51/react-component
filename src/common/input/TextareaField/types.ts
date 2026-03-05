import type { InputTextareaProps } from "../../InputTextarea/types";

export interface TextareaFieldProps extends InputTextareaProps {
  /** Identifiant du champ (lie le label et le textarea) */
  id: string;
  /** Texte du label */
  label: string;
  /** Message d'erreur affiché sous le champ */
  error?: string;
  /** Message d'aide affiché sous le champ */
  hint?: string;
}
