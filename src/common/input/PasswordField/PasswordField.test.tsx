import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PasswordField } from "./PasswordField";

describe("PasswordField", () => {
  it("associe le label au champ et masque le mot de passe par défaut", () => {
    render(<PasswordField id="pwd" label="Mot de passe" />);
    const input = screen.getByLabelText("Mot de passe");
    expect(input).toHaveAttribute("id", "pwd");
    expect(input).toHaveAttribute("type", "password");
  });

  it("bascule l'affichage du mot de passe au clic sur le bouton", () => {
    render(<PasswordField id="pwd" label="Mot de passe" />);
    const input = screen.getByLabelText("Mot de passe");
    const toggle = screen.getByRole("button", { name: "Afficher le mot de passe" });

    expect(toggle).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggle);
    expect(input).toHaveAttribute("type", "text");
    expect(toggle).toHaveAttribute("aria-label", "Masquer le mot de passe");
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(toggle);
    expect(input).toHaveAttribute("type", "password");
  });

  it("permet de personnaliser les libellés accessibles du bouton", () => {
    render(
      <PasswordField
        id="pwd"
        label="Mot de passe"
        showPasswordLabel="Voir"
        hidePasswordLabel="Cacher"
      />,
    );
    expect(screen.getByRole("button", { name: "Voir" })).toBeInTheDocument();
  });

  it("passe en état erreur et relie le message via aria-describedby", () => {
    render(<PasswordField id="pwd" label="Mot de passe" error="Mot de passe trop court" />);
    const input = screen.getByLabelText("Mot de passe");
    expect(input).toHaveClass("input-text--error");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "pwd-error");
    expect(screen.getByRole("alert")).toHaveTextContent("Mot de passe trop court");
  });

  it("affiche le hint et le relie via aria-describedby en l'absence d'erreur", () => {
    render(<PasswordField id="pwd" label="Mot de passe" hint="8 caractères minimum" />);
    const input = screen.getByLabelText("Mot de passe");
    expect(screen.getByText("8 caractères minimum")).toHaveAttribute("id", "pwd-hint");
    expect(input).toHaveAttribute("aria-describedby", "pwd-hint");
  });
});
