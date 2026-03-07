import clsx from "clsx";
import { forwardRef } from "react";
import "./InputText.css";
import type { InputTextProps, InputTextSize, InputTextState } from "./types";

const sizeClass: Record<InputTextSize, string> = {
  sm: "input-text--sm",
  md: "input-text--md",
  lg: "input-text--lg",
};

const stateClass: Record<InputTextState, string> = {
  default: "",
  error: "input-text--error",
  success: "input-text--success",
};

/**
 * Champ de saisie texte du design system.
 * Compatible `forwardRef` pour l'intégration avec les bibliothèques de formulaire.
 */
export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ state = "default", size = "md", className = "", ...props }, ref) => {
    const classes = clsx("input-text", sizeClass[size], stateClass[state], className);

    return <input ref={ref} className={classes} {...props} />;
  },
);

InputText.displayName = "InputText";
