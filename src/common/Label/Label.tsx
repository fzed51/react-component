import clsx from "clsx";
import "./Label.css";
import type { LabelProps } from "./types";

/**
 * Libellé de champ de formulaire.
 */
export function Label({ children, required, htmlFor, className = "", ...props }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={clsx("form-label", className)} {...props}>
      {children}
      {required && (
        <span className="form-label__required" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
  );
}
