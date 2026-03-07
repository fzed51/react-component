import { forwardRef } from "react";
import { FormGroup } from "../../FormGroup";
import { InputTextarea } from "../../InputTextarea";
import { Label } from "../../Label";
import type { TextareaFieldProps } from "./types";

/**
 * Champ texte multiligne composé : FormGroup > Label + InputTextarea.
 * Compatible `forwardRef`.
 *
 * @example
 * <TextareaField id="bio" label="Biographie" hint="Max 500 caractères" rows={4} />
 */
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ id, label, error, hint, required, state, ...props }, ref) => {
    const fieldState = error ? "error" : state;

    return (
      <FormGroup error={error} hint={hint}>
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        <InputTextarea ref={ref} id={id} state={fieldState} required={required} {...props} />
      </FormGroup>
    );
  },
);

TextareaField.displayName = "TextareaField";
