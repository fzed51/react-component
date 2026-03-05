import type { SelectorProps } from "../../Selector/types";

export interface SelectorFieldProps extends SelectorProps {
  /** Identifiant du champ (lie le label et le select) */
  id: string;
  /** Texte du label */
  label: string;
  /** Message d'erreur affiché sous le champ */
  error?: string;
  /** Message d'aide affiché sous le champ */
  hint?: string;
}
