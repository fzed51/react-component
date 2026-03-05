import type { InputTextProps } from "../../InputText/types";

export interface InputTextFieldProps extends InputTextProps {
  /** Identifiant du champ (lie le label et l'input) */
  id: string;
  /** Texte du label */
  label: string;
  /** Message d'erreur affiché sous le champ */
  error?: string;
  /** Message d'aide affiché sous le champ */
  hint?: string;
}
