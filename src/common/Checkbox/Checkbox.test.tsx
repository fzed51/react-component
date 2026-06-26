import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("rend une case à cocher par défaut (variant checkbox, taille md)", () => {
    render(<Checkbox label="Conditions" />);
    const input = screen.getByRole("checkbox", { name: "Conditions" });
    const wrapper = input.closest("label");
    expect(input).toHaveAttribute("type", "checkbox");
    expect(wrapper).toHaveClass("checkbox", "checkbox--checkbox", "checkbox--md");
  });

  it("applique les classes de variante interrupteur et de taille", () => {
    render(<Checkbox variant="switch" size="lg" label="Notifications" />);
    const wrapper = screen.getByRole("checkbox", { name: "Notifications" }).closest("label");
    expect(wrapper).toHaveClass("checkbox--switch", "checkbox--lg");
  });

  it("expose aria-invalid en état erreur, pas autrement", () => {
    const { rerender } = render(<Checkbox state="error" label="Opt-in" />);
    expect(screen.getByRole("checkbox", { name: "Opt-in" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );

    rerender(<Checkbox label="Opt-in" />);
    expect(screen.getByRole("checkbox", { name: "Opt-in" })).not.toHaveAttribute("aria-invalid");
  });

  it("transmet la ref vers l'élément input natif", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="Réf" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByRole("checkbox", { name: "Réf" }));
  });

  it("transmet les attributs natifs (checked, disabled)", () => {
    render(<Checkbox defaultChecked disabled label="Désactivé" />);
    const input = screen.getByRole("checkbox", { name: "Désactivé" });
    expect(input).toBeChecked();
    expect(input).toBeDisabled();
  });

  it("n'affiche pas de label quand la prop label est absente", () => {
    const { container } = render(<Checkbox aria-label="sans label" />);
    expect(container.querySelector(".checkbox__label")).toBeNull();
  });
});
