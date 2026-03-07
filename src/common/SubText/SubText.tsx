import clsx from "clsx";
import "./SubText.css";
import type { SubTextProps, SubTextVariant } from "./types";

const variantClass: Record<SubTextVariant, string> = {
  default: "text-secondary",
  muted: "text-tertiary",
  error: "text-error",
  success: "text-success",
  warning: "text-warning",
};

/**
 * Texte secondaire / légende — petite taille, couleur atténuée.
 */
export function SubText({ children, variant = "default", className = "", ...props }: SubTextProps) {
  const classes = clsx("sub-text", "text-sm", variantClass[variant], className);

  return (
    <small className={classes} {...props}>
      {children}
    </small>
  );
}
