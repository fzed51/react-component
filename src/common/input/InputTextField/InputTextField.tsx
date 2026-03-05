import { forwardRef } from "react";
import { FormGroup } from "../../FormGroup";
import { InputText } from "../../InputText";
import { Label } from "../../Label";
import type { InputTextFieldProps } from "./types";

/**
 * Champ texte composé : FormGroup > Label + InputText.
 * Accepte tous les types HTML supportés par InputText (text, email, password, number, date, tel…).
 * Compatible `forwardRef`.
 *
 * @example
 * <InputTextField id="email" label="Email" type="email" required error="Email invalide" />
 */
export const InputTextField = forwardRef<HTMLInputElement, InputTextFieldProps>(
  ({ id, label, error, hint, required, state, ...props }, ref) => {
    const fieldState = error ? "error" : state;

    return (
      <FormGroup error={error} hint={hint}>
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        <InputText
          ref={ref}
          id={id}
          state={fieldState}
          required={required}
          {...props}
        />
      </FormGroup>
    );
  },
);

InputTextField.displayName = "InputTextField";
