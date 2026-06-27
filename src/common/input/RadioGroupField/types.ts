import type { ReactNode } from "react";
import type { RadioGroupProps } from "../../RadioGroup/types";

export interface RadioGroupFieldProps extends Omit<RadioGroupProps, "name"> {
  /** Identifiant du champ (lie la légende et les messages au groupe) */
  id: string;
  /** Nom partagé des boutons radio (défaut : `id`) */
  name?: string;
  /** Libellé du groupe affiché au-dessus des options */
  label: ReactNode;
  /** Message d'erreur affiché sous le groupe (porte sur le groupe entier) */
  error?: string;
  /** Message d'aide affiché sous le groupe */
  hint?: string;
  /** Marque le groupe comme obligatoire (indicateur visuel) */
  required?: boolean;
}
