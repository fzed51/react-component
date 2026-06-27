import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import type { RadioOption } from "../../RadioGroup";
import { RadioGroupField } from "./RadioGroupField";

const options: RadioOption[] = [
  { value: "free", label: "Gratuit" },
  { value: "pro", label: "Pro" },
];

describe("RadioGroupField", () => {
  it("relie le groupe à sa légende via aria-labelledby", () => {
    render(<RadioGroupField id="plan" label="Formule" options={options} />);
    const group = screen.getByRole("radiogroup", { name: "Formule" });
    expect(group).toHaveAttribute("aria-labelledby", "plan-label");
  });

  it("utilise l'id comme name par défaut", () => {
    render(<RadioGroupField id="plan" label="Formule" options={options} />);
    expect(screen.getByRole("radio", { name: "Gratuit" })).toHaveAttribute("name", "plan");
  });

  it("permet de surcharger le name", () => {
    render(<RadioGroupField id="plan" name="abonnement" label="Formule" options={options} />);
    expect(screen.getByRole("radio", { name: "Pro" })).toHaveAttribute("name", "abonnement");
  });

  it("affiche l'erreur, force l'état error et la relie via aria-describedby", () => {
    render(
      <RadioGroupField id="plan" label="Formule" options={options} error="Choix obligatoire" />,
    );
    const error = screen.getByRole("alert");
    expect(error).toHaveTextContent("Choix obligatoire");
    expect(error).toHaveAttribute("id", "plan-error");

    const group = screen.getByRole("radiogroup", { name: "Formule" });
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(group).toHaveAttribute("aria-describedby", "plan-error");
  });

  it("affiche un indicateur requis dans la légende", () => {
    const { container } = render(
      <RadioGroupField id="plan" label="Formule" required options={options} />,
    );
    expect(container.querySelector(".radio-group__required")).toBeInTheDocument();
  });

  it("transmet la ref vers le conteneur du groupe", () => {
    const ref = createRef<HTMLDivElement>();
    render(<RadioGroupField ref={ref} id="plan" label="Formule" options={options} />);
    expect(ref.current).toBe(screen.getByRole("radiogroup", { name: "Formule" }));
  });
});
