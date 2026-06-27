import type { InputTextFieldProps } from "../InputTextField/types";

export interface PasswordFieldProps extends Omit<InputTextFieldProps, "type"> {
  /**
   * Libellé accessible du bouton lorsque le mot de passe est masqué
   * (l'action proposée est donc « afficher »).
   */
  showPasswordLabel?: string;
  /**
   * Libellé accessible du bouton lorsque le mot de passe est visible
   * (l'action proposée est donc « masquer »).
   */
  hidePasswordLabel?: string;
}
