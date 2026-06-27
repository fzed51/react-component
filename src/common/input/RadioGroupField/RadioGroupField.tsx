import { FormGroup } from "../../FormGroup";
import { RadioGroup } from "../../RadioGroup";
import type { RadioGroupFieldProps } from "./types";

/**
 * Champ groupe radio composé : FormGroup > légende + RadioGroup + message.
 * L'erreur porte sur le groupe entier (et non sur une option). Le groupe est
 * relié à sa légende via `aria-labelledby` et au message via `aria-describedby`.
 * Accepte une `ref` (prop standard React 19) relayée vers le conteneur du groupe.
 *
 * @example
 * <RadioGroupField
 *   id="plan"
 *   label="Formule"
 *   required
 *   layout="inline"
 *   defaultValue="pro"
 *   options={[
 *     { value: "free", label: "Gratuit" },
 *     { value: "pro", label: "Pro" },
 *   ]}
 * />
 */
export function RadioGroupField({
  id,
  name,
  label,
  error,
  hint,
  required,
  state,
  ref,
  ...props
}: RadioGroupFieldProps) {
  const fieldState = error ? "error" : state;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <FormGroup error={error} hint={hint} fieldId={id}>
      <span className="radio-group__legend" id={`${id}-label`}>
        {label}
        {required && (
          <span className="radio-group__required" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </span>
      <RadioGroup
        ref={ref}
        id={id}
        name={name ?? id}
        state={fieldState}
        aria-labelledby={`${id}-label`}
        aria-describedby={describedBy}
        {...props}
      />
    </FormGroup>
  );
}
