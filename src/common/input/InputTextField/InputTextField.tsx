import { FormGroup } from "../../FormGroup";
import { InputText } from "../../InputText";
import { Label } from "../../Label";
import type { InputTextFieldProps } from "./types";

/**
 * Champ texte composé : FormGroup > Label + InputText.
 * Accepte tous les types HTML supportés par InputText (text, email, password, number, date, tel…).
 * Accepte une `ref` (prop standard React 19) relayée vers l'input interne.
 *
 * @example
 * <InputTextField id="email" label="Email" type="email" required error="Email invalide" />
 */
export function InputTextField({
  id,
  label,
  error,
  hint,
  required,
  state,
  ref,
  ...props
}: InputTextFieldProps) {
  const fieldState = error ? "error" : state;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <FormGroup error={error} hint={hint} fieldId={id}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <InputText
        ref={ref}
        id={id}
        state={fieldState}
        required={required}
        aria-describedby={describedBy}
        {...props}
      />
    </FormGroup>
  );
}
