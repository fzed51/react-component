import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup } from "./RadioGroup";
import type { RadioOption } from "./types";

const options: RadioOption[] = [
  { value: "free", label: "Gratuit" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Entreprise", disabled: true },
];

describe("RadioGroup", () => {
  it("rend un groupe (role radiogroup) avec une option par entrée", () => {
    render(<RadioGroup name="plan" options={options} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("partage le name et applique la disposition stack par défaut", () => {
    render(<RadioGroup name="plan" options={options} />);
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveClass("radio-group", "radio-group--stack");
    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toHaveAttribute("name", "plan");
    }
  });

  it("applique la disposition grid et le nombre de colonnes", () => {
    render(<RadioGroup name="plan" options={options} layout="grid" columns={3} />);
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveClass("radio-group--grid");
    expect(group).toHaveStyle({ "--radio-group-cols": "3" });
  });

  it("présélectionne l'option correspondant à defaultValue (non contrôlé)", () => {
    render(<RadioGroup name="plan" options={options} defaultValue="pro" />);
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Gratuit" })).not.toBeChecked();
  });

  it("désactive une option ciblée et tout le groupe", () => {
    const { rerender } = render(<RadioGroup name="plan" options={options} />);
    expect(screen.getByRole("radio", { name: "Entreprise" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "Gratuit" })).toBeEnabled();

    rerender(<RadioGroup name="plan" options={options} disabled />);
    expect(screen.getByRole("radio", { name: "Gratuit" })).toBeDisabled();
  });

  it("notifie la valeur sélectionnée via onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RadioGroup name="plan" options={options} onChange={onChange} />);

    await user.click(screen.getByRole("radio", { name: "Pro" }));
    expect(onChange).toHaveBeenCalledWith("pro", expect.anything());
  });

  it("propage l'état erreur au groupe et aux options", () => {
    render(<RadioGroup name="plan" options={options} state="error" />);
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("radio", { name: "Gratuit" })).toHaveAttribute("aria-invalid", "true");
  });

  it("transmet la ref vers le conteneur du groupe", () => {
    const ref = createRef<HTMLDivElement>();
    render(<RadioGroup ref={ref} name="plan" options={options} />);
    expect(ref.current).toBe(screen.getByRole("radiogroup"));
  });
});
