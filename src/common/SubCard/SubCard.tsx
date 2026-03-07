import clsx from "clsx";
import "./SubCard.css";
import type { SubCardProps, SubCardVariant } from "./types";

const variantClass: Record<SubCardVariant, string> = {
  default: "sub-card--default",
  subtle: "sub-card--subtle",
  muted: "sub-card--muted",
};

/**
 * Sous-cadre — surface interne d'une Card, avec fond légèrement teinté et bordure.
 * Utilisation : encadrer une section secondaire à l'intérieur d'un Card.
 */
export function SubCard({ children, variant = "default", className = "", ...props }: SubCardProps) {
  const classes = clsx("sub-card", variantClass[variant], className);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
