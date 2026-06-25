import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("rend les enfants et applique les classes par défaut (primary / md)", () => {
    render(<Button>Valider</Button>);
    const btn = screen.getByRole("button", { name: "Valider" });
    expect(btn).toHaveClass("btn", "btn--primary", "btn--md");
  });

  it("applique la variante et la taille demandées", () => {
    render(
      <Button variant="danger" size="lg">
        Supprimer
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Supprimer" });
    expect(btn).toHaveClass("btn--danger", "btn--lg");
  });

  it("ajoute btn--full-width quand fullWidth est vrai", () => {
    render(<Button fullWidth>Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn--full-width");
  });

  it("désactive le bouton et expose aria-busy en état loading", () => {
    render(<Button loading>Envoi</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toHaveClass("btn--loading");
  });

  it("reste désactivé via la prop disabled", () => {
    render(<Button disabled>Inactif</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("transmet les attributs natifs (type, onClick)", () => {
    render(<Button type="submit">OK</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("transmet la ref vers l'élément button natif", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Réf</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole("button", { name: "Réf" }));
  });
});
