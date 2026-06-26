import { type ReactNode, useId, useState } from "react";
import { Button } from "../common";
import "./Demo.css";

interface DemoProps {
  /** Code source (JSX) correspondant au rendu, affiché à la demande */
  code: string;
  /** Rendu vivant de l'exemple */
  children: ReactNode;
}

/**
 * Bloc de démonstration du playground : affiche un rendu vivant et,
 * sur demande, le code source correspondant (masqué par défaut).
 * Réservé à la vitrine — non exporté par la bibliothèque.
 */
export function Demo({ code, children }: DemoProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="demo">
      <div className="demo__preview">{children}</div>

      <div className="demo__bar">
        <Button
          variant="ghost"
          size="sm"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Masquer le code" : "Voir le code"}
        </Button>
      </div>

      <pre className="demo__code" id={panelId} hidden={!open}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
