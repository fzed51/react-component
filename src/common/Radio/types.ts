import type { InputHTMLAttributes, ReactNode, Ref } from "react";

export type RadioSize = "sm" | "md" | "lg";
export type RadioState = "default" | "error" | "success";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Taille du contrôle */
  size?: RadioSize;
  /** Variante d'état */
  state?: RadioState;
  /** Libellé affiché à côté du contrôle */
  label?: ReactNode;
  /** Référence vers l'élément input natif */
  ref?: Ref<HTMLInputElement>;
}
