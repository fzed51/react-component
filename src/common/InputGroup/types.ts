import type { HTMLAttributes, ReactNode } from "react";

export interface InputGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "prefix"> {
  children: ReactNode;
  /** Élément affiché avant l'input (icône, texte…) */
  prefix?: ReactNode;
  /** Élément affiché après l'input (icône, bouton…) */
  suffix?: ReactNode;
  /**
   * Rend le suffixe interactif (cliquable) plutôt que purement décoratif :
   * retire `aria-hidden` et réactive les événements de pointeur sur le suffixe.
   * À activer pour y placer un contrôle (ex. bouton afficher/masquer un mot de passe).
   */
  interactiveSuffix?: boolean;
}
