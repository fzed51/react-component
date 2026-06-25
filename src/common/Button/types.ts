import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Style visuel du bouton */
  variant?: ButtonVariant;
  /** Taille du bouton */
  size?: ButtonSize;
  /** Prend toute la largeur disponible */
  fullWidth?: boolean;
  /** Affiche un état de chargement */
  loading?: boolean;
  /** Référence vers l'élément button natif */
  ref?: Ref<HTMLButtonElement>;
}
