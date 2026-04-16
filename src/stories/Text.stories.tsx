import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../common/Text";

const meta: Meta<typeof Text> = {
  title: "Commun/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: "Exemple de texte du design system.",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary" },
};

export const Error: Story = {
  args: { variant: "error", children: "Texte d'erreur" },
};

export const Success: Story = {
  args: { variant: "success", children: "Texte de succès" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Texte d'avertissement" },
};

export const ExtraSmall: Story = {
  args: { size: "xs" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Block: Story = {
  args: { box: true },
  parameters: { layout: "padded" },
};
