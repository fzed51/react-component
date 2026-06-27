import type { ChangeEvent, HTMLAttributes, ReactNode, Ref } from "react";
import type { RadioSize, RadioState } from "../Radio/types";

export type { RadioSize, RadioState } from "../Radio/types";

export type RadioGroupLayout = "stack" | "inline" | "grid";

export interface RadioOption {
  /** Valeur soumise lorsque l'option est sélectionnée */
  value: string;
  /** Libellé affiché à côté du bouton radio */
  label: ReactNode;
  /** Désactive uniquement cette option */
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Nom partagé par tous les boutons radio (assure l'exclusivité du choix) */
  name: string;
  /** Options du groupe */
  options: RadioOption[];
  /** Valeur sélectionnée (mode contrôlé) */
  value?: string;
  /** Valeur sélectionnée initiale (mode non contrôlé) */
  defaultValue?: string;
  /** Appelé avec la valeur de l'option sélectionnée */
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Disposition des options */
  layout?: RadioGroupLayout;
  /** Nombre de colonnes (utilisé uniquement avec `layout="grid"`) */
  columns?: number;
  /** Taille des contrôles */
  size?: RadioSize;
  /** Variante d'état appliquée à tout le groupe */
  state?: RadioState;
  /** Désactive tout le groupe */
  disabled?: boolean;
  /** Référence vers le conteneur du groupe */
  ref?: Ref<HTMLDivElement>;
}
