import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design System/Couleurs",
  parameters: {
    layout: "padded",
  },
};

export default meta;

/* ─── Types ─────────────────────────────────────────────────── */
interface ColorSwatchProps {
  variable: string;
  label?: string;
}

function ColorSwatch({ variable, label }: ColorSwatchProps) {
  const name = label ?? variable;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4em", width: "9em" }}>
      <div
        style={{
          width: "2em",
          height: "2em",
          backgroundColor: `var(${variable})`,
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-sm)",
          flexShrink: 0,
        }}
        title={variable}
      />
      <span
        style={{
          fontSize: "var(--font-size-xs)",
          color: "var(--color-text-secondary)",
          textAlign: "center",
          wordBreak: "break-all",
          lineHeight: 1.3,
        }}
      >
        {name}
      </span>
    </div>
  );
}

interface ColorGroupProps {
  title: string;
  colors: Array<{ variable: string; label?: string }>;
}

function ColorGroup({ title, colors }: ColorGroupProps) {
  return (
    <section style={{ marginBottom: "2em" }}>
      <h3
        style={{
          fontSize: "var(--font-size-sm)",
          fontWeight: "var(--font-weight-semibold)" as React.CSSProperties["fontWeight"],
          textTransform: "uppercase",
          letterSpacing: "var(--letter-spacing-wide)",
          color: "var(--color-text-tertiary)",
          marginBottom: "1em",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "0.4em",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5em" }}>
        {colors.map(({ variable, label }) => (
          <ColorSwatch key={variable} variable={variable} label={label} />
        ))}
      </div>
    </section>
  );
}

/* ─── Story ─────────────────────────────────────────────────── */
export const Palette: StoryObj = {
  name: "Palette de couleurs",
  render: () => (
    <div style={{ fontFamily: "var(--font-family-base)", padding: "1em" }}>
      <h1
        style={{
          fontSize: "var(--font-size-2xl)",
          fontWeight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
          color: "var(--color-text-primary)",
          marginBottom: "0.25em",
        }}
      >
        Palette de couleurs
      </h1>
      <p
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-secondary)",
          marginBottom: "2em",
        }}
      >
        Chaque carré affiche la valeur résolue de la variable CSS correspondante.
      </p>

      <ColorGroup
        title="Couleurs de base"
        colors={[
          { variable: "--color-primary" },
          { variable: "--color-secondary" },
          { variable: "--color-warning" },
          { variable: "--color-error" },
        ]}
      />

      <ColorGroup
        title="Dérivées — Primary"
        colors={[
          { variable: "--color-primary" },
          { variable: "--color-primary-hover" },
          { variable: "--color-primary-light" },
        ]}
      />

      <ColorGroup
        title="Dérivées — Secondary"
        colors={[
          { variable: "--color-secondary" },
          { variable: "--color-secondary-hover" },
          { variable: "--color-secondary-light" },
        ]}
      />

      <ColorGroup
        title="Dérivées — Warning & Error"
        colors={[
          { variable: "--color-warning" },
          { variable: "--color-warning-light" },
          { variable: "--color-error" },
          { variable: "--color-error-light" },
        ]}
      />

      <ColorGroup
        title="Statuts sémantiques"
        colors={[
          { variable: "--color-success", label: "--color-success\n(= secondary)" },
          { variable: "--color-success-light" },
          { variable: "--color-info", label: "--color-info\n(= primary)" },
          { variable: "--color-info-light" },
        ]}
      />

      <ColorGroup
        title="Texte"
        colors={[
          { variable: "--color-text-primary" },
          { variable: "--color-text-secondary" },
          { variable: "--color-text-tertiary" },
          { variable: "--color-text-disabled" },
          { variable: "--color-text-inverse" },
          { variable: "--color-text-link" },
        ]}
      />

      <ColorGroup
        title="Fonds & Surfaces"
        colors={[
          { variable: "--color-bg-app" },
          { variable: "--color-bg-surface" },
          { variable: "--color-bg-subtle" },
          { variable: "--color-bg-muted" },
          { variable: "--color-bg-dark" },
        ]}
      />

      <ColorGroup
        title="Bordures"
        colors={[
          { variable: "--color-border" },
          { variable: "--color-border-strong" },
          { variable: "--color-border-focus" },
        ]}
      />
    </div>
  ),
};
