import clsx from "clsx";
import "./InputGroup.css";
import type { InputGroupProps } from "./types";

/**
 * Groupe d'input avec préfixe et/ou suffixe visuels.
 * Entourer `InputText` (ou autre contrôle) avec des ornements
 * sans casser l'accessibilité.
 *
 * @example
 * <InputGroup prefix={<SearchIcon />}>
 *   <InputText placeholder="Rechercher…" />
 * </InputGroup>
 */
export function InputGroup({
  children,
  prefix,
  suffix,
  className = "",
  ...props
}: InputGroupProps) {
  const classes = clsx(
    "input-group",
    prefix && "input-group--has-prefix",
    suffix && "input-group--has-suffix",
    className,
  );

  return (
    <div className={classes} {...props}>
      {prefix && (
        <span className="input-group__prefix" aria-hidden="true">
          {prefix}
        </span>
      )}
      {children}
      {suffix && (
        <span className="input-group__suffix" aria-hidden="true">
          {suffix}
        </span>
      )}
    </div>
  );
}
