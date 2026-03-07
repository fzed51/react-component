import { forwardRef } from "react";
import { FormGroup } from "../../FormGroup";
import { Label } from "../../Label";
import { Selector } from "../../Selector";
import type { SelectorFieldProps } from "./types";

/**
 * Champ sélecteur composé : FormGroup > Label + Selector.
 * Compatible `forwardRef`.
 *
 * @example
 * <SelectorField id="country" label="Pays" required error="Champ obligatoire">
 *   <option value="fr">France</option>
 *   <option value="be">Belgique</option>
 * </SelectorField>
 */
export const SelectorField = forwardRef<HTMLSelectElement, SelectorFieldProps>(
  ({ id, label, error, hint, required, state, ...props }, ref) => {
    const fieldState = error ? "error" : state;

    return (
      <FormGroup error={error} hint={hint}>
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        <Selector ref={ref} id={id} state={fieldState} required={required} {...props} />
      </FormGroup>
    );
  },
);

SelectorField.displayName = "SelectorField";
