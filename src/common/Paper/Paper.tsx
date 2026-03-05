import clsx from "clsx";
import "./Paper.css";
import type { PaperProps } from "./types";

/**
 * Zone centrale de mise en page.
 * Centre le contenu horizontalement et limite la largeur à 1000px.
 *
 * @example
 * <Paper>
 *   <Titre1>Ma page</Titre1>
 * </Paper>
 */
export function Paper({ children, className = "", ...props }: PaperProps) {
  return (
    <div className={clsx("paper", className)} {...props}>
      {children}
    </div>
  );
}
