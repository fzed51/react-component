import type { InputHTMLAttributes, ReactNode, Ref } from "react";

export type CheckboxVariant = "checkbox" | "switch";
export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxState = "default" | "error" | "success";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Forme du contrôle : case à cocher (`"checkbox"`) ou interrupteur (`"switch"`) */
  variant?: CheckboxVariant;
  /** Taille du contrôle */
  size?: CheckboxSize;
  /** Variante d'état */
  state?: CheckboxState;
  /** Libellé affiché à côté du contrôle */
  label?: ReactNode;
  /** Référence vers l'élément input natif */
  ref?: Ref<HTMLInputElement>;
}
