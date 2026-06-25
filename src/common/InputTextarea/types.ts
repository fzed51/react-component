import type { Ref, TextareaHTMLAttributes } from "react";

export type InputTextareaSize = "sm" | "md" | "lg";
export type InputTextareaState = "default" | "error" | "success";

export interface InputTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Variante d'état */
  state?: InputTextareaState;
  /** Taille du champ */
  size?: InputTextareaSize;
  /** Référence vers l'élément textarea natif */
  ref?: Ref<HTMLTextAreaElement>;
}
