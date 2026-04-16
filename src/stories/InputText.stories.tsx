import type { Meta, StoryObj } from "@storybook/react";
import { InputText } from "../common/InputText";

const meta: Meta<typeof InputText> = {
  title: "Commun/InputText",
  component: InputText,
  tags: ["autodocs"],
  args: {
    placeholder: "Saisir du texte…",
  },
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Valeur par défaut" },
};

export const StateError: Story = {
  args: { state: "error" },
};

export const StateSuccess: Story = {
  args: { state: "success" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Champ désactivé" },
};
