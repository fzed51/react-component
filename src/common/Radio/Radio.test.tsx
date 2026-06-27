import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Radio } from "./Radio";

describe("Radio", () => {
  it("rend un bouton radio par défaut (taille md)", () => {
    render(<Radio name="plan" value="pro" label="Pro" />);
    const input = screen.getByRole("radio", { name: "Pro" });
    const wrapper = input.closest("label");
    expect(input).toHaveAttribute("type", "radio");
    expect(wrapper).toHaveClass("radio", "radio--md");
  });

  it("applique la classe de taille", () => {
    render(<Radio name="plan" value="pro" size="lg" label="Pro" />);
    const wrapper = screen.getByRole("radio", { name: "Pro" }).closest("label");
    expect(wrapper).toHaveClass("radio--lg");
  });

  it("expose aria-invalid en état erreur, pas autrement", () => {
    const { rerender } = render(<Radio name="plan" value="pro" state="error" label="Pro" />);
    expect(screen.getByRole("radio", { name: "Pro" })).toHaveAttribute("aria-invalid", "true");

    rerender(<Radio name="plan" value="pro" label="Pro" />);
    expect(screen.getByRole("radio", { name: "Pro" })).not.toHaveAttribute("aria-invalid");
  });

  it("transmet la ref vers l'élément input natif", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Radio ref={ref} name="plan" value="pro" label="Réf" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByRole("radio", { name: "Réf" }));
  });

  it("transmet les attributs natifs (checked, disabled)", () => {
    render(<Radio name="plan" value="pro" defaultChecked disabled label="Désactivé" />);
    const input = screen.getByRole("radio", { name: "Désactivé" });
    expect(input).toBeChecked();
    expect(input).toBeDisabled();
  });

  it("n'affiche pas de label quand la prop label est absente", () => {
    const { container } = render(<Radio name="plan" value="pro" aria-label="sans label" />);
    expect(container.querySelector(".radio__label")).toBeNull();
  });
});
