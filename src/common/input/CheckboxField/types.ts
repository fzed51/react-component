import type { ReactNode } from "react";
import type { CheckboxProps } from "../../Checkbox/types";

export interface CheckboxFieldProps extends Omit<CheckboxProps, "label"> {
  /** Identifiant du champ (lie le label et l'input) */
  id: string;
  /** Texte du label affiché à côté du contrôle */
  label: ReactNode;
  /** Message d'erreur affiché sous le champ */
  error?: string;
  /** Message d'aide affiché sous le champ */
  hint?: string;
}
