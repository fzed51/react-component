import clsx from "clsx";
import type { CSSProperties } from "react";
import { Radio } from "../Radio";
import "./RadioGroup.css";
import type { RadioGroupLayout, RadioGroupProps } from "./types";

const layoutClass: Record<RadioGroupLayout, string> = {
  stack: "radio-group--stack",
  inline: "radio-group--inline",
  grid: "radio-group--grid",
};

/**
 * Groupe de boutons radio : choix unique et exclusif au sein d'un ensemble.
 * Trois dispositions via `layout` : `"stack"` (colonne), `"inline"` (ligne) ou
 * `"grid"` (grille de `columns` colonnes). Le `name` partagé garantit l'exclusivité.
 * Fonctionne en mode contrôlé (`value` + `onChange`) ou non contrôlé (`defaultValue`).
 *
 * @example
 * <RadioGroup
 *   name="plan"
 *   defaultValue="pro"
 *   options={[
 *     { value: "free", label: "Gratuit" },
 *     { value: "pro", label: "Pro" },
 *   ]}
 * />
 */
export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onChange,
  layout = "stack",
  columns,
  size = "md",
  state = "default",
  disabled = false,
  className = "",
  style,
  ref,
  ...props
}: RadioGroupProps) {
  const classes = clsx("radio-group", layoutClass[layout], className);
  const isControlled = value !== undefined;
  const groupStyle =
    layout === "grid" && columns != null
      ? ({ ...style, "--radio-group-cols": String(columns) } as CSSProperties)
      : style;

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-invalid={state === "error" || undefined}
      className={classes}
      style={groupStyle}
      {...props}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          size={size}
          state={state}
          disabled={disabled || option.disabled}
          checked={isControlled ? value === option.value : undefined}
          defaultChecked={isControlled ? undefined : defaultValue === option.value}
          onChange={(event) => onChange?.(option.value, event)}
        />
      ))}
    </div>
  );
}
