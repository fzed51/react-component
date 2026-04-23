import type { HTMLAttributes, ReactNode } from "react";

export type TableSize = "sm" | "md" | "lg";

export interface TableColumn<T = Record<string, unknown>> {
  /** Identifiant unique de la colonne */
  key: string;
  /** Contenu de l'en-tête */
  header: ReactNode;
  /** Clé de la propriété de la ligne ou fonction de rendu */
  accessor: keyof T | ((row: T, index: number) => ReactNode);
  /** Largeur CSS de la colonne (ex: "1fr", "120px", "20%") */
  width?: string;
  /** Alignement du contenu */
  align?: "left" | "center" | "right";
}

export interface TableProps<T = Record<string, unknown>>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Définition des colonnes */
  columns: TableColumn<T>[];
  /** Données à afficher */
  data: T[];
  /** Lignes alternées */
  striped?: boolean;
  /** Bordures internes */
  bordered?: boolean;
  /** Taille des cellules */
  size?: TableSize;
  /** Légende affichée au-dessus du tableau */
  caption?: string;
  /** Message affiché quand data est vide */
  emptyLabel?: string;
  /** Texte de la ligne de chargement progressif */
  loadingLabel?: string;
  /** Nombre de lignes chargées par lot (affichage progressif) */
  pageSize?: number;
  /** Fonction de clé unique par ligne */
  getRowKey?: (row: T, index: number) => string | number;
}
