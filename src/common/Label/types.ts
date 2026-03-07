import type { LabelHTMLAttributes, ReactNode } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  /** Identifiant du champ associé */
  htmlFor: string;
  /** Affiche un astérisque rouge pour indiquer le champ obligatoire */
  required?: boolean;
}
