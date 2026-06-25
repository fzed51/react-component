import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormGroup } from "./FormGroup";

describe("FormGroup", () => {
  it("affiche le message d'erreur avec role=alert et la classe d'erreur", () => {
    const { container } = render(
      <FormGroup error="Champ obligatoire">
        <input />
      </FormGroup>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Champ obligatoire");
    expect(container.firstChild).toHaveClass("form-group--error");
  });

  it("affiche le hint quand il n'y a pas d'erreur", () => {
    render(
      <FormGroup hint="Format attendu : nom@domaine.fr">
        <input />
      </FormGroup>,
    );
    expect(screen.getByText("Format attendu : nom@domaine.fr")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("masque le hint lorsqu'une erreur est présente (l'erreur prime)", () => {
    render(
      <FormGroup error="Erreur" hint="Aide">
        <input />
      </FormGroup>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText("Aide")).not.toBeInTheDocument();
  });
});
