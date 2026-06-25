import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { InputText } from "./InputText";

describe("InputText", () => {
  it("applique les classes de taille et d'état", () => {
    render(<InputText size="lg" state="error" placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveClass("input-text", "input-text--lg", "input-text--error");
  });

  it("ne pose aucune classe d'état en mode default", () => {
    render(<InputText placeholder="Nom" />);
    const input = screen.getByPlaceholderText("Nom");
    expect(input).toHaveClass("input-text", "input-text--md");
    expect(input.className).not.toMatch(/input-text--(error|success)/);
  });

  it("expose aria-invalid en état erreur, pas autrement", () => {
    const { rerender } = render(<InputText state="error" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("aria-invalid", "true");

    rerender(<InputText placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).not.toHaveAttribute("aria-invalid");
  });

  it("transmet la ref vers l'élément input natif", () => {
    const ref = createRef<HTMLInputElement>();
    render(<InputText ref={ref} placeholder="Réf" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByPlaceholderText("Réf"));
  });

  it("transmet les attributs natifs (type, value)", () => {
    render(<InputText type="email" defaultValue="a@b.fr" placeholder="Email" />);
    const input = screen.getByPlaceholderText<HTMLInputElement>("Email");
    expect(input).toHaveAttribute("type", "email");
    expect(input.value).toBe("a@b.fr");
  });
});
