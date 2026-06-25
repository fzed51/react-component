import { FormGroup } from "../../FormGroup";
import { InputTextarea } from "../../InputTextarea";
import { Label } from "../../Label";
import type { TextareaFieldProps } from "./types";

/**
 * Champ texte multiligne composé : FormGroup > Label + InputTextarea.
 * Accepte une `ref` (prop standard React 19) relayée vers le textarea interne.
 *
 * @example
 * <TextareaField id="bio" label="Biographie" hint="Max 500 caractères" rows={4} />
 */
export function TextareaField({
  id,
  label,
  error,
  hint,
  required,
  state,
  ref,
  ...props
}: TextareaFieldProps) {
  const fieldState = error ? "error" : state;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <FormGroup error={error} hint={hint} fieldId={id}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <InputTextarea
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
