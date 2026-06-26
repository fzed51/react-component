import { Checkbox } from "../../Checkbox";
import { FormGroup } from "../../FormGroup";
import type { CheckboxFieldProps } from "./types";

/**
 * Champ case à cocher composé : FormGroup > Checkbox (label intégré) + message.
 * Le label étant adjacent au contrôle, ce champ ne compose pas `Label` mais
 * relie directement le message d'erreur / d'aide via `aria-describedby`.
 * Accepte une `ref` (prop standard React 19) relayée vers l'input interne.
 *
 * @example
 * <CheckboxField id="cgu" label="J'accepte les conditions" required error="Champ obligatoire" />
 * <CheckboxField id="notif" variant="switch" label="Activer les notifications" />
 */
export function CheckboxField({
  id,
  label,
  error,
  hint,
  required,
  state,
  ref,
  ...props
}: CheckboxFieldProps) {
  const fieldState = error ? "error" : state;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <FormGroup error={error} hint={hint} fieldId={id}>
      <Checkbox
        ref={ref}
        id={id}
        state={fieldState}
        required={required}
        aria-describedby={describedBy}
        label={
          <>
            {label}
            {required && (
              <span className="checkbox__required" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </>
        }
        {...props}
      />
    </FormGroup>
  );
}
