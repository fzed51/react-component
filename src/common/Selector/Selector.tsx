import clsx from "clsx";
import { forwardRef } from "react";
import "./Selector.css";
import type { SelectorProps, SelectorSize, SelectorState } from "./types";

const sizeClass: Record<SelectorSize, string> = {
  sm: "selector--sm",
  md: "selector--md",
  lg: "selector--lg",
};

const stateClass: Record<SelectorState, string> = {
  default: "",
  error: "selector--error",
  success: "selector--success",
};

/**
 * Liste déroulante du design system.
 * Compatible `forwardRef` pour l'intégration avec les bibliothèques de formulaire.
 *
 * @example
 * <Selector placeholder="Choisir un pays">
 *   <option value="fr">France</option>
 *   <option value="be">Belgique</option>
 * </Selector>
 */
export const Selector = forwardRef<HTMLSelectElement, SelectorProps>(
  ({ children, state = "default", size = "md", placeholder, className = "", ...props }, ref) => {
    const classes = clsx("selector", sizeClass[size], stateClass[state], className);

    return (
      <div className="selector-wrapper">
        <select ref={ref} className={classes} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <span className="selector-wrapper__chevron" aria-hidden="true" />
      </div>
    );
  },
);

Selector.displayName = "Selector";
