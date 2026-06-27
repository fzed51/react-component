import { useState } from "react";
import { FormGroup } from "../../FormGroup";
import { InputGroup } from "../../InputGroup";
import { InputText } from "../../InputText";
import { Label } from "../../Label";
import "./PasswordField.css";
import type { PasswordFieldProps } from "./types";

/** Icône « œil » — proposer d'afficher le mot de passe. */
function EyeIcon() {
  return (
    <svg
      className="password-field__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** Icône « œil barré » — proposer de masquer le mot de passe. */
function EyeOffIcon() {
  return (
    <svg
      className="password-field__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.9 5a10.4 10.4 0 0 1 2.1-.2c6.5 0 10 7 10 7a17.2 17.2 0 0 1-2.9 3.8" />
      <path d="M6.6 6.6A17.3 17.3 0 0 0 2 12s3.5 7 10 7a10.3 10.3 0 0 0 5.4-1.4" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="m3 3 18 18" />
    </svg>
  );
}

/**
 * Champ mot de passe composé : `FormGroup > Label + InputGroup(InputText + bouton afficher/masquer)`.
 * Le bouton bascule le `type` de l'input entre `password` et `text`.
 * Accepte une `ref` (prop standard React 19) relayée vers l'input interne.
 *
 * @example
 * <PasswordField id="pwd" label="Mot de passe" autoComplete="current-password" required />
 */
export function PasswordField({
  id,
  label,
  error,
  hint,
  required,
  state,
  ref,
  showPasswordLabel = "Afficher le mot de passe",
  hidePasswordLabel = "Masquer le mot de passe",
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const fieldState = error ? "error" : state;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const toggle = (
    <button
      type="button"
      className="password-field__toggle"
      onClick={() => setVisible((v) => !v)}
      aria-label={visible ? hidePasswordLabel : showPasswordLabel}
      aria-pressed={visible}
      aria-controls={id}
    >
      {visible ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );

  return (
    <FormGroup error={error} hint={hint} fieldId={id}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <InputGroup suffix={toggle} interactiveSuffix>
        <InputText
          ref={ref}
          id={id}
          type={visible ? "text" : "password"}
          state={fieldState}
          required={required}
          aria-describedby={describedBy}
          {...props}
        />
      </InputGroup>
    </FormGroup>
  );
}
