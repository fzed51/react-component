import clsx from "clsx";
import "./Divider.css";
import type { DividerProps } from "./types";

/**
 * Ligne de séparation visuelle entre deux blocs de contenu.
 */
export function Divider({
  orientation = "horizontal",
  label,
  className = "",
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return <div className={clsx("divider", "divider--vertical", className)} aria-hidden="true" />;
  }

  if (label) {
    return (
      <div className={clsx("divider", "divider--labeled", className)}>
        <hr className="divider__line" {...props} />
        <span className="divider__label">{label}</span>
        <hr className="divider__line" />
      </div>
    );
  }

  return <hr className={clsx("divider", className)} {...props} />;
}
