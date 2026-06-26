import clsx from "clsx";
import "./Checkbox.css";
import type { CheckboxProps, CheckboxSize, CheckboxState, CheckboxVariant } from "./types";

const variantClass: Record<CheckboxVariant, string> = {
  checkbox: "checkbox--checkbox",
  switch: "checkbox--switch",
};

const sizeClass: Record<CheckboxSize, string> = {
  sm: "checkbox--sm",
  md: "checkbox--md",
  lg: "checkbox--lg",
};

const stateClass: Record<CheckboxState, string> = {
  default: "",
  error: "checkbox--error",
  success: "checkbox--success",
};

/**
 * Case à cocher du design system, déclinée en deux formes via `variant` :
 * `"checkbox"` (case à cocher) ou `"switch"` (interrupteur).
 * Accepte une `ref` (prop standard React 19) pour l'intégration avec les bibliothèques de formulaire.
 *
 * @example
 * <Checkbox label="J'accepte les conditions" />
 * <Checkbox variant="switch" label="Activer les notifications" />
 */
export function Checkbox({
  variant = "checkbox",
  size = "md",
  state = "default",
  label,
  className = "",
  ref,
  ...props
}: CheckboxProps) {
  const classes = clsx(
    "checkbox",
    variantClass[variant],
    sizeClass[size],
    stateClass[state],
    className,
  );

  return (
    <label className={classes}>
      <input
        type="checkbox"
        className="checkbox__input"
        ref={ref}
        aria-invalid={state === "error" || undefined}
        {...props}
      />
      <span className="checkbox__visual" aria-hidden="true" />
      {label != null && <span className="checkbox__label">{label}</span>}
    </label>
  );
}
