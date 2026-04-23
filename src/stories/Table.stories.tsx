import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../common/Badge";
import { Table } from "../common/Table";
import type { TableColumn } from "../common/Table";

/* ── Données de démonstration ─────────────────────────── */

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
};

const users: User[] = [
  { id: 1, name: "Alice Martin", email: "alice@example.com", role: "Admin", status: "active" },
  { id: 2, name: "Bob Dupont", email: "bob@example.com", role: "Éditeur", status: "active" },
  { id: 3, name: "Claire Leroy", email: "claire@example.com", role: "Lecteur", status: "inactive" },
  { id: 4, name: "David Moreau", email: "david@example.com", role: "Éditeur", status: "active" },
  { id: 5, name: "Élise Bernard", email: "elise@example.com", role: "Admin", status: "inactive" },
];

const columns: TableColumn<User>[] = [
  { key: "id", header: "#", accessor: "id", width: "60px", align: "center" },
  { key: "name", header: "Nom", accessor: "name" },
  { key: "email", header: "Email", accessor: "email" },
  { key: "role", header: "Rôle", accessor: "role", width: "120px" },
  {
    key: "status",
    header: "Statut",
    accessor: (row) => (
      <Badge variant={row.status === "active" ? "success" : "default"}>
        {row.status === "active" ? "Actif" : "Inactif"}
      </Badge>
    ),
    width: "100px",
    align: "center",
  },
];

/* ── Meta ─────────────────────────────────────────────── */

const meta = {
  title: "Commun/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

/* ── Stories ──────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <Table<User>
      columns={columns}
      data={users}
      getRowKey={(row) => row.id}
    />
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table<User>
      columns={columns}
      data={users}
      caption="Liste des utilisateurs"
      getRowKey={(row) => row.id}
    />
  ),
};

export const Striped: Story = {
  render: () => (
    <Table<User>
      columns={columns}
      data={users}
      striped
      getRowKey={(row) => row.id}
    />
  ),
};

export const Bordered: Story = {
  render: () => (
    <Table<User>
      columns={columns}
      data={users}
      bordered
      getRowKey={(row) => row.id}
    />
  ),
};

export const StripedAndBordered: Story = {
  render: () => (
    <Table<User>
      columns={columns}
      data={users}
      striped
      bordered
      caption="Striped + Bordered"
      getRowKey={(row) => row.id}
    />
  ),
};

export const Small: Story = {
  render: () => (
    <Table<User>
      columns={columns}
      data={users}
      size="sm"
      getRowKey={(row) => row.id}
    />
  ),
};

export const Large: Story = {
  render: () => (
    <Table<User>
      columns={columns}
      data={users}
      size="lg"
      getRowKey={(row) => row.id}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <Table<User>
      columns={columns}
      data={[]}
      emptyLabel="Aucun utilisateur trouvé."
    />
  ),
};
