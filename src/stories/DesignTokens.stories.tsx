import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design System/Tokens",
  parameters: {
    layout: "padded",
  },
};

export default meta;

/* ─── Composants utilitaires ────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "var(--font-size-lg)",
        fontWeight: "var(--font-weight-semibold)" as React.CSSProperties["fontWeight"],
        color: "var(--color-text-primary)",
        marginTop: "2em",
        marginBottom: "1em",
        paddingBottom: "0.4em",
        borderBottom: "2px solid var(--color-border)",
      }}
    >
      {children}
    </h2>
  );
}

function TokenTable({ rows }: { rows: Array<{ name: string; value: string; preview?: React.ReactNode }> }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "var(--font-size-sm)",
        marginBottom: "1.5em",
      }}
    >
      <thead>
        <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
          {["Variable", "Valeur", "Aperçu"].map((h) => (
            <th
              key={h}
              style={{
                textAlign: "left",
                padding: "0.4em 0.75em",
                color: "var(--color-text-tertiary)",
                fontWeight: "var(--font-weight-semibold)" as React.CSSProperties["fontWeight"],
                textTransform: "uppercase",
                letterSpacing: "var(--letter-spacing-wide)",
                fontSize: "var(--font-size-xs)",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ name, value, preview }, i) => (
          <tr
            key={name}
            style={{
              backgroundColor: i % 2 === 0 ? "transparent" : "var(--color-bg-subtle)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <td style={{ padding: "0.5em 0.75em", fontFamily: "var(--font-family-mono)", color: "var(--color-primary)" }}>
              {name}
            </td>
            <td style={{ padding: "0.5em 0.75em", color: "var(--color-text-secondary)" }}>{value}</td>
            <td style={{ padding: "0.5em 0.75em" }}>{preview ?? null}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ─── Story ─────────────────────────────────────────────────── */
export const Tokens: StoryObj = {
  name: "Variables de taille & mise en forme",
  render: () => (
    <div style={{ fontFamily: "var(--font-family-base)", padding: "1em", maxWidth: "900px" }}>
      <h1
        style={{
          fontSize: "var(--font-size-2xl)",
          fontWeight: "var(--font-weight-bold)" as React.CSSProperties["fontWeight"],
          color: "var(--color-text-primary)",
          marginBottom: "0.25em",
        }}
      >
        Variables de taille &amp; mise en forme
      </h1>
      <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", marginBottom: "0.5em" }}>
        Toutes les variables CSS du design system hors couleurs.
      </p>

      {/* ── Typographie — tailles ── */}
      <SectionTitle>Typographie — Tailles</SectionTitle>
      <TokenTable
        rows={[
          {
            name: "--font-size-base",
            value: "0.9375rem (≈ 15px)",
            preview: <span style={{ fontSize: "var(--font-size-base)" }}>Aa — base</span>,
          },
          {
            name: "--font-size-xs",
            value: "calc(sm / scale) ≈ 9.6px",
            preview: <span style={{ fontSize: "var(--font-size-xs)" }}>Aa — xs</span>,
          },
          {
            name: "--font-size-sm",
            value: "calc(base / scale) ≈ 12px",
            preview: <span style={{ fontSize: "var(--font-size-sm)" }}>Aa — sm</span>,
          },
          {
            name: "--font-size-md",
            value: "= base ≈ 15px",
            preview: <span style={{ fontSize: "var(--font-size-md)" }}>Aa — md</span>,
          },
          {
            name: "--font-size-lg",
            value: "calc(base × scale) ≈ 18.75px",
            preview: <span style={{ fontSize: "var(--font-size-lg)" }}>Aa — lg</span>,
          },
          {
            name: "--font-size-xl",
            value: "calc(lg × scale) ≈ 23.4px",
            preview: <span style={{ fontSize: "var(--font-size-xl)" }}>Aa — xl</span>,
          },
          {
            name: "--font-size-2xl",
            value: "calc(xl × scale) ≈ 29.3px",
            preview: <span style={{ fontSize: "var(--font-size-2xl)" }}>Aa — 2xl</span>,
          },
          {
            name: "--font-size-3xl",
            value: "calc(2xl × scale) ≈ 36.6px",
            preview: <span style={{ fontSize: "var(--font-size-3xl)" }}>Aa — 3xl</span>,
          },
        ]}
      />

      {/* ── Typographie — poids ── */}
      <SectionTitle>Typographie — Poids</SectionTitle>
      <TokenTable
        rows={[
          {
            name: "--font-weight-light",
            value: "300",
            preview: <span style={{ fontWeight: 300, fontSize: "var(--font-size-md)" }}>Texte light 300</span>,
          },
          {
            name: "--font-weight-regular",
            value: "400",
            preview: <span style={{ fontWeight: 400, fontSize: "var(--font-size-md)" }}>Texte regular 400</span>,
          },
          {
            name: "--font-weight-medium",
            value: "500",
            preview: <span style={{ fontWeight: 500, fontSize: "var(--font-size-md)" }}>Texte medium 500</span>,
          },
          {
            name: "--font-weight-semibold",
            value: "600",
            preview: <span style={{ fontWeight: 600, fontSize: "var(--font-size-md)" }}>Texte semibold 600</span>,
          },
          {
            name: "--font-weight-bold",
            value: "700",
            preview: <span style={{ fontWeight: 700, fontSize: "var(--font-size-md)" }}>Texte bold 700</span>,
          },
        ]}
      />

      {/* ── Typographie — interligne ── */}
      <SectionTitle>Typographie — Interligne</SectionTitle>
      <TokenTable
        rows={[
          {
            name: "--line-height-tight",
            value: "1.2",
            preview: (
              <span style={{ lineHeight: 1.2, display: "inline-block", width: "14em", fontSize: "var(--font-size-sm)" }}>
                Ligne serrée. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
            ),
          },
          {
            name: "--line-height-normal",
            value: "1.5",
            preview: (
              <span style={{ lineHeight: 1.5, display: "inline-block", width: "14em", fontSize: "var(--font-size-sm)" }}>
                Ligne normale. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
            ),
          },
          {
            name: "--line-height-loose",
            value: "1.8",
            preview: (
              <span style={{ lineHeight: 1.8, display: "inline-block", width: "14em", fontSize: "var(--font-size-sm)" }}>
                Ligne aérée. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
            ),
          },
        ]}
      />

      {/* ── Typographie — espacement lettres ── */}
      <SectionTitle>Typographie — Espacement des lettres</SectionTitle>
      <TokenTable
        rows={[
          {
            name: "--letter-spacing-tight",
            value: "-0.02em",
            preview: <span style={{ letterSpacing: "-0.02em" }}>Espacement serré</span>,
          },
          {
            name: "--letter-spacing-normal",
            value: "0",
            preview: <span style={{ letterSpacing: "0" }}>Espacement normal</span>,
          },
          {
            name: "--letter-spacing-wide",
            value: "0.04em",
            preview: <span style={{ letterSpacing: "0.04em" }}>Espacement large</span>,
          },
        ]}
      />

      {/* ── Typographie — familles ── */}
      <SectionTitle>Typographie — Familles</SectionTitle>
      <TokenTable
        rows={[
          {
            name: "--font-family-base",
            value: "system-ui / sans-serif",
            preview: <span style={{ fontFamily: "var(--font-family-base)" }}>The quick brown fox</span>,
          },
          {
            name: "--font-family-mono",
            value: "SFMono-Regular / Consolas / Menlo",
            preview: <span style={{ fontFamily: "var(--font-family-mono)" }}>const x = 42;</span>,
          },
        ]}
      />

      {/* ── Espacement ── */}
      <SectionTitle>Espacement (--space-*)</SectionTitle>
      <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)", marginBottom: "0.75em" }}>
        Unité de base : <code style={{ fontFamily: "var(--font-family-mono)" }}>--space-unit = font-size-base / 3.75 ≈ 4px</code>
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5em", marginBottom: "1.5em" }}>
        {[
          { name: "--space-1", mult: 1, approx: "≈ 4px" },
          { name: "--space-2", mult: 2, approx: "≈ 8px" },
          { name: "--space-3", mult: 3, approx: "≈ 12px" },
          { name: "--space-4", mult: 4, approx: "≈ 16px" },
          { name: "--space-5", mult: 5, approx: "≈ 20px" },
          { name: "--space-6", mult: 6, approx: "≈ 24px" },
          { name: "--space-8", mult: 8, approx: "≈ 32px" },
          { name: "--space-10", mult: 10, approx: "≈ 40px" },
          { name: "--space-12", mult: 12, approx: "≈ 48px" },
          { name: "--space-16", mult: 16, approx: "≈ 64px" },
          { name: "--space-20", mult: 20, approx: "≈ 80px" },
        ].map(({ name, approx }) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <span
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "var(--font-size-xs)",
                color: "var(--color-primary)",
                width: "10em",
                flexShrink: 0,
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontSize: "var(--font-size-xs)",
                color: "var(--color-text-tertiary)",
                width: "5em",
                flexShrink: 0,
              }}
            >
              {approx}
            </span>
            <div
              style={{
                height: "1em",
                width: `var(${name})`,
                backgroundColor: "var(--color-primary)",
                borderRadius: "2px",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Bordures arrondies ── */}
      <SectionTitle>Bordures arrondies (--radius-*)</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5em", marginBottom: "1.5em" }}>
        {[
          { name: "--radius-none", label: "none", value: "0" },
          { name: "--radius-sm", label: "sm", value: "≈ 4px" },
          { name: "--radius-md", label: "md", value: "≈ 8px" },
          { name: "--radius-lg", label: "lg", value: "≈ 12px" },
          { name: "--radius-xl", label: "xl", value: "≈ 16px" },
          { name: "--radius-full", label: "full", value: "9999px" },
        ].map(({ name, label, value }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4em" }}>
            <div
              style={{
                width: "3em",
                height: "3em",
                borderRadius: `var(${name})`,
                border: "2px solid var(--color-primary)",
                backgroundColor: "var(--color-primary-light)",
              }}
            />
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-primary)", fontFamily: "var(--font-family-mono)" }}>
              {label}
            </span>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* ── Épaisseur de bordure ── */}
      <SectionTitle>Épaisseur de bordure (--border-width-*)</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2em", marginBottom: "1.5em" }}>
        {[
          { name: "--border-width", label: "1px", px: "1px" },
          { name: "--border-width-medium", label: "2px", px: "2px" },
          { name: "--border-width-thick", label: "4px", px: "4px" },
        ].map(({ name, label, px }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4em" }}>
            <div
              style={{
                width: "4em",
                height: "2em",
                border: `${px} solid var(--color-primary)`,
                borderRadius: "var(--radius-sm)",
              }}
            />
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-primary)", fontFamily: "var(--font-family-mono)" }}>
              {name}
            </span>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Ombres ── */}
      <SectionTitle>Ombres (--shadow-*)</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2em", marginBottom: "1.5em" }}>
        {[
          { name: "--shadow-xs", label: "xs" },
          { name: "--shadow-sm", label: "sm" },
          { name: "--shadow-md", label: "md" },
          { name: "--shadow-lg", label: "lg" },
          { name: "--shadow-xl", label: "xl" },
        ].map(({ name, label }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5em" }}>
            <div
              style={{
                width: "5em",
                height: "3em",
                boxShadow: `var(${name})`,
                backgroundColor: "var(--color-bg-surface)",
                borderRadius: "var(--radius-md)",
              }}
            />
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-primary)", fontFamily: "var(--font-family-mono)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Tailles d'icônes ── */}
      <SectionTitle>Tailles d'icônes (--size-icon-*)</SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "2em", marginBottom: "1.5em" }}>
        {[
          { name: "--size-icon-sm", label: "sm", approx: "≈ 16px" },
          { name: "--size-icon-md", label: "md", approx: "≈ 20px" },
          { name: "--size-icon-lg", label: "lg", approx: "≈ 24px" },
          { name: "--size-icon-xl", label: "xl", approx: "≈ 32px" },
        ].map(({ name, label, approx }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4em" }}>
            <div
              style={{
                width: `var(${name})`,
                height: `var(${name})`,
                backgroundColor: "var(--color-primary)",
                borderRadius: "var(--radius-sm)",
                opacity: 0.8,
              }}
            />
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-primary)", fontFamily: "var(--font-family-mono)" }}>
              {label}
            </span>
            <span style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-tertiary)" }}>{approx}</span>
          </div>
        ))}
      </div>

      {/* ── Transitions ── */}
      <SectionTitle>Transitions (--transition-*)</SectionTitle>
      <TokenTable
        rows={[
          { name: "--transition-fast", value: "100ms ease" },
          { name: "--transition-normal", value: "200ms ease" },
          { name: "--transition-slow", value: "350ms ease" },
        ]}
      />

      {/* ── Z-index ── */}
      <SectionTitle>Z-index (--z-*)</SectionTitle>
      <TokenTable
        rows={[
          { name: "--z-base", value: "0" },
          { name: "--z-raised", value: "10" },
          { name: "--z-overlay", value: "100" },
          { name: "--z-modal", value: "1000" },
          { name: "--z-toast", value: "2000" },
        ]}
      />
    </div>
  ),
};
