import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../common/Badge";

const meta: Meta<typeof Badge> = {
  title: "Commun/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { variant: "default" },
};

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Success: Story = {
  args: { variant: "success", children: "Succès" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Attention" },
};

export const Error: Story = {
  args: { variant: "error", children: "Erreur" },
};

export const Info: Story = {
  args: { variant: "info", children: "Info" },
};

export const Small: Story = {
  args: { size: "sm" },
};
