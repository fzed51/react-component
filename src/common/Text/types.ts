import type { HTMLAttributes, ReactNode } from "react";

export type TextVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "error"
  | "success"
  | "warning";
export type TextSize = "xs" | "sm" | "md" | "lg";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Variante de couleur */
  variant?: TextVariant;
  /** Taille du texte */
  size?: TextSize;
  /** Rendre comme un élément de bloc (div) */
  box?: boolean;
  /** Rendre comme un élément en ligne (span) */
  inline?: boolean;
}
