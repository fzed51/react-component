import clsx from "clsx";
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
 * Accepte une `ref` (prop standard React 19) pour l'intégration avec les bibliothèques de formulaire.
 */
export function InputText({
  state = "default",
  size = "md",
  className = "",
  ref,
  ...props
}: InputTextProps) {
  const classes = clsx("input-text", sizeClass[size], stateClass[state], className);

  return (
    <input ref={ref} className={classes} aria-invalid={state === "error" || undefined} {...props} />
  );
}
