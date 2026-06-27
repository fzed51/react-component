import clsx from "clsx";
import "./Radio.css";
import type { RadioProps, RadioSize, RadioState } from "./types";

const sizeClass: Record<RadioSize, string> = {
  sm: "radio--sm",
  md: "radio--md",
  lg: "radio--lg",
};

const stateClass: Record<RadioState, string> = {
  default: "",
  error: "radio--error",
  success: "radio--success",
};

/**
 * Bouton radio du design system : choix unique au sein d'un groupe (voir `RadioGroup`).
 * Le `<label>` enveloppe le contrôle : cliquer le libellé sélectionne l'option.
 * Accepte une `ref` (prop standard React 19) pour l'intégration avec les bibliothèques de formulaire.
 *
 * @example
 * <Radio name="plan" value="pro" label="Pro" defaultChecked />
 */
export function Radio({
  size = "md",
  state = "default",
  label,
  className = "",
  ref,
  ...props
}: RadioProps) {
  const classes = clsx("radio", sizeClass[size], stateClass[state], className);

  return (
    <label className={classes}>
      <input
        type="radio"
        className="radio__input"
        ref={ref}
        aria-invalid={state === "error" || undefined}
        {...props}
      />
      <span className="radio__visual" aria-hidden="true" />
      {label != null && <span className="radio__label">{label}</span>}
    </label>
  );
}
