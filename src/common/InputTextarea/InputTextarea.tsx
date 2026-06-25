import clsx from "clsx";
import "./InputTextarea.css";
import type { InputTextareaProps, InputTextareaSize, InputTextareaState } from "./types";

const sizeClass: Record<InputTextareaSize, string> = {
  sm: "input-textarea--sm",
  md: "input-textarea--md",
  lg: "input-textarea--lg",
};

const stateClass: Record<InputTextareaState, string> = {
  default: "",
  error: "input-textarea--error",
  success: "",
};

/**
 * Champ de saisie multiligne du design system.
 * Accepte une `ref` (prop standard React 19) pour l'intégration avec les bibliothèques de formulaire.
 */
export function InputTextarea({
  state = "default",
  size = "md",
  className = "",
  ref,
  ...props
}: InputTextareaProps) {
  const classes = clsx("input-textarea", sizeClass[size], stateClass[state], className);

  return <textarea ref={ref} className={classes} {...props} />;
}
