import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InputTextField } from "./InputTextField";

describe("InputTextField", () => {
  it("associe le label au champ via htmlFor / id", () => {
    render(<InputTextField id="email" label="Email" type="email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("id", "email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("passe le contrôle en état erreur et affiche le message", () => {
    render(<InputTextField id="email" label="Email" error="Email invalide" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Email invalide");
    expect(screen.getByLabelText("Email")).toHaveClass("input-text--error");
  });

  it("affiche le hint en l'absence d'erreur", () => {
    render(<InputTextField id="email" label="Email" hint="Votre adresse pro" />);
    expect(screen.getByText("Votre adresse pro")).toBeInTheDocument();
  });
});
