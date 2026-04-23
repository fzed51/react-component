import { useLayoutEffect, useRef, useState } from "react";
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

const ROLES = ["Admin", "Éditeur", "Lecteur", "Modérateur"];
const FIRST_NAMES = ["Alice", "Bob", "Claire", "David", "Élise", "Farid", "Gwen", "Hugo", "Inès", "Jules"];
const LAST_NAMES = ["Martin", "Dupont", "Leroy", "Moreau", "Bernard", "Lemaire", "Petit", "Simon", "Laurent", "Michel"];

/** Génère n utilisateurs fictifs */
function generateUsers(n: number): User[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length]}`,
    email: `user${i + 1}@example.com`,
    role: ROLES[i % ROLES.length],
    status: i % 3 === 2 ? "inactive" : "active",
  }));
}

const users = generateUsers(5);
const manyUsers = generateUsers(100);
const bigUsers = generateUsers(1000);

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

export const Progressive: Story = {
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "100 lignes chargées progressivement par lots de 10. Faites défiler vers le bas pour charger la suite.",
      },
    },
  },
  render: () => (
    <div style={{ height: "400px", overflow: "auto", padding: "1rem" }}>
      <Table<User>
        columns={columns}
        data={manyUsers}
        striped
        caption="Affichage progressif — 100 lignes, lots de 10"
        pageSize={10}
        getRowKey={(row) => row.id}
      />
    </div>
  ),
};

/* ── Benchmark ────────────────────────────────────────── */

interface MeasuredTableProps {
  progressive: boolean;
  startTime: number;
  onMeasured: (ms: number) => void;
}

function MeasuredTable({ progressive, startTime, onMeasured }: MeasuredTableProps) {
  // useLayoutEffect se déclenche de manière synchrone après la mise à jour du DOM.
  // On capture ici le temps écoulé depuis le clic, qui correspond au temps de rendu initial.
  useLayoutEffect(() => {
    onMeasured(performance.now() - startTime);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={progressive ? { height: "400px", overflow: "auto" } : undefined}>
      <Table<User>
        columns={columns}
        data={bigUsers}
        striped
        caption={`1 000 lignes — ${progressive ? "progressif (lots de 20)" : "tout affiché d'un coup"}`}
        pageSize={progressive ? 20 : bigUsers.length}
        getRowKey={(row) => row.id}
      />
    </div>
  );
}

interface BenchmarkWrapperProps {
  progressive: boolean;
}

function BenchmarkWrapper({ progressive }: BenchmarkWrapperProps) {
  const [key, setKey] = useState(0);
  const [renderMs, setRenderMs] = useState<number | null>(null);
  const startRef = useRef(0);

  const handleRun = () => {
    setRenderMs(null);
    startRef.current = performance.now();
    setKey((k) => k + 1);
  };

  const label = progressive ? "premier lot rendu (20 lignes)" : "1 000 lignes rendues";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={handleRun}
          style={{
            padding: "8px 20px",
            cursor: "pointer",
            borderRadius: "6px",
            border: "1px solid #0a66c2",
            background: "#0a66c2",
            color: "#fff",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          ▶ Lancer le benchmark
        </button>

        {renderMs !== null && (
          <span style={{ fontSize: "14px" }}>
            ⏱ <strong>{renderMs.toFixed(2)} ms</strong>
            {" — "}
            {label}
          </span>
        )}
      </div>

      {key > 0 && (
        <MeasuredTable
          key={key}
          progressive={progressive}
          startTime={startRef.current}
          onMeasured={setRenderMs}
        />
      )}
    </div>
  );
}

export const Benchmark1000: Story = {
  name: "Benchmark — 1 000 lignes (tout d'un coup)",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Mesure le temps entre le clic et le premier paint DOM de 1 000 lignes rendues d'un seul coup.",
      },
    },
  },
  render: () => <BenchmarkWrapper progressive={false} />,
};

export const Benchmark1000Progressive: Story = {
  name: "Benchmark — 1 000 lignes (progressif)",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Mesure le temps entre le clic et le premier paint DOM du premier lot de 20 lignes. Les 980 lignes suivantes chargent au fil du scroll.",
      },
    },
  },
  render: () => <BenchmarkWrapper progressive={true} />,
};
