import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../common/Card";
import { Text } from "../common/Text";

const meta: Meta<typeof Card> = {
  title: "Commun/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    children: (
      <Text>Contenu de la carte avec du texte affiché à l'intérieur.</Text>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const NoPadding: Story = {
  args: { noPadding: true },
};
