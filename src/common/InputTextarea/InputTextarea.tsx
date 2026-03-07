import clsx from "clsx";
import { forwardRef } from "react";
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
 * Compatible `forwardRef` pour l'intégration avec les bibliothèques de formulaire.
 */
export const InputTextarea = forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  ({ state = "default", size = "md", className = "", ...props }, ref) => {
    const classes = clsx("input-textarea", sizeClass[size], stateClass[state], className);

    return <textarea ref={ref} className={classes} {...props} />;
  },
);

InputTextarea.displayName = "InputTextarea";
