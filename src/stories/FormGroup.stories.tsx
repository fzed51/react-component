import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../common/Label";
import { FormGroup } from "../common/FormGroup";
import { InputText } from "../common/InputText";
import { Selector } from "../common/Selector";

const meta: Meta<typeof FormGroup> = {
  title: "Commun/FormGroup",
  component: FormGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

export const WithInputText: Story = {
  render: () => (
    <FormGroup>
      <Label htmlFor="email">Adresse e-mail</Label>
      <InputText id="email" type="email" placeholder="exemple@domaine.fr" />
    </FormGroup>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormGroup error="Ce champ est obligatoire.">
      <Label htmlFor="name" required>
        Nom
      </Label>
      <InputText id="name" state="error" />
    </FormGroup>
  ),
};

export const WithHint: Story = {
  render: () => (
    <FormGroup hint="Minimum 8 caractères, une majuscule et un chiffre.">
      <Label htmlFor="password" required>
        Mot de passe
      </Label>
      <InputText id="password" type="password" />
    </FormGroup>
  ),
};

export const WithSelector: Story = {
  render: () => (
    <FormGroup>
      <Label htmlFor="country">Pays</Label>
      <Selector id="country" placeholder="Choisir un pays">
        <option value="fr">France</option>
        <option value="be">Belgique</option>
        <option value="ch">Suisse</option>
      </Selector>
    </FormGroup>
  ),
};
