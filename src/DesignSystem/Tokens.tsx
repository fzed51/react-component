import { useEffect, useState } from "react";
import { Card, SubText, Text, Titre2, Titre3 } from "../common";
import "./Tokens.css";

/* ── Listes de tokens (déclarés dans src/styles/base.css) ─────────────── */

const COLOR_GROUPS: { title: string; tokens: string[] }[] = [
  {
    title: "Marque",
    tokens: [
      "--color-primary",
      "--color-primary-hover",
      "--color-primary-light",
      "--color-secondary",
      "--color-secondary-hover",
      "--color-secondary-light",
      "--color-warning",
      "--color-warning-light",
      "--color-error",
      "--color-error-light",
    ],
  },
  {
    title: "Statut",
    tokens: ["--color-success", "--color-success-light", "--color-info", "--color-info-light"],
  },
  {
    title: "Texte",
    tokens: [
      "--color-text-primary",
      "--color-text-secondary",
      "--color-text-tertiary",
      "--color-text-disabled",
      "--color-text-inverse",
      "--color-text-link",
    ],
  },
  {
    title: "Fonds",
    tokens: [
      "--color-bg-surface",
      "--color-bg-app",
      "--color-bg-subtle",
      "--color-bg-muted",
      "--color-bg-dark",
    ],
  },
  {
    title: "Bordures",
    tokens: ["--color-border", "--color-border-strong", "--color-border-focus"],
  },
];

const ALL_COLORS = COLOR_GROUPS.flatMap((g) => g.tokens);

const FONT_SIZES = [
  "--font-size-xs",
  "--font-size-sm",
  "--font-size-md",
  "--font-size-lg",
  "--font-size-xl",
  "--font-size-2xl",
  "--font-size-3xl",
];

const FONT_WEIGHTS = [
  "--font-weight-light",
  "--font-weight-regular",
  "--font-weight-medium",
  "--font-weight-semibold",
  "--font-weight-bold",
];

const SPACINGS = [
  "--space-1",
  "--space-2",
  "--space-3",
  "--space-4",
  "--space-5",
  "--space-6",
  "--space-8",
  "--space-10",
  "--space-12",
  "--space-16",
  "--space-20",
];

const RADII = [
  "--radius-none",
  "--radius-sm",
  "--radius-md",
  "--radius-lg",
  "--radius-xl",
  "--radius-full",
];

const SHADOWS = ["--shadow-xs", "--shadow-sm", "--shadow-md", "--shadow-lg", "--shadow-xl"];

const ICON_SIZES = ["--size-icon-sm", "--size-icon-md", "--size-icon-lg", "--size-icon-xl"];

const TRANSITIONS = ["--transition-fast", "--transition-normal", "--transition-slow"];

const Z_INDEX = ["--z-base", "--z-raised", "--z-overlay", "--z-modal", "--z-toast"];

const LENGTHS = [...FONT_SIZES, ...SPACINGS, ...RADII, ...ICON_SIZES];
const RAW = [...FONT_WEIGHTS, ...SHADOWS, ...TRANSITIONS, ...Z_INDEX];

/* ── Résolution des valeurs réelles au runtime ────────────────────────── */

function resolveColors(names: string[]): Record<string, string> {
  const probe = document.createElement("span");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const out: Record<string, string> = {};
  for (const name of names) {
    probe.style.color = `var(${name})`;
    out[name] = getComputedStyle(probe).color;
  }
  probe.remove();
  return out;
}

function resolveLengths(names: string[]): Record<string, string> {
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const out: Record<string, string> = {};
  for (const name of names) {
    probe.style.width = `var(${name})`;
    out[name] = getComputedStyle(probe).width;
  }
  probe.remove();
  return out;
}

function resolveRaw(names: string[]): Record<string, string> {
  const root = getComputedStyle(document.documentElement);
  const out: Record<string, string> = {};
  for (const name of names) out[name] = root.getPropertyValue(name).trim();
  return out;
}

/* ── Sous-composants d'affichage ──────────────────────────────────────── */

function TokenName({ name, value }: { name: string; value?: string }) {
  return (
    <div className="token__labels">
      <code className="token__name">{name}</code>
      {value && <span className="token__value">{value}</span>}
    </div>
  );
}

/**
 * Section « Design tokens » du playground : explique le principe des variables
 * CSS et affiche leurs valeurs réelles (résolues au runtime) de façon visuelle.
 * Réservée à la vitrine — non exportée par la bibliothèque.
 */
export function Tokens() {
  const [colors, setColors] = useState<Record<string, string>>({});
  const [lengths, setLengths] = useState<Record<string, string>>({});
  const [raw, setRaw] = useState<Record<string, string>>({});

  useEffect(() => {
    setColors(resolveColors(ALL_COLORS));
    setLengths(resolveLengths(LENGTHS));
    setRaw(resolveRaw(RAW));
  }, []);

  return (
    <Card>
      <Titre2 className="mb-2">Design tokens</Titre2>
      <Text variant="secondary" className="mb-1">
        Toutes les valeurs visuelles dérivent de variables CSS définies dans{" "}
        <code>src/styles/base.css</code> (bloc <code>:root</code>). Ne jamais coder de valeur en dur
        : utiliser ces tokens.
      </Text>
      <SubText className="mb-4">
        Les couleurs dérivées sont calculées par <code>color-mix()</code> à partir des couleurs de
        base ; les tailles dérivent de deux réglages — <code>--space-unit</code> (espacements,
        rayons) et <code>--font-size-base</code> × <code>--font-scale</code> (typographie). Les
        valeurs ci-dessous sont résolues à l'exécution.
      </SubText>

      {/* Couleurs */}
      <Titre3 className="mb-3">Couleurs</Titre3>
      <div className="d-flex flex-col gap-4">
        {COLOR_GROUPS.map((group) => (
          <div key={group.title}>
            <SubText className="mb-2">{group.title}</SubText>
            <div className="token-grid">
              {group.tokens.map((name) => (
                <div key={name} className="token-swatch">
                  <span
                    className="token-swatch__chip"
                    style={{ backgroundColor: `var(${name})` }}
                  />
                  <TokenName name={name} value={colors[name]} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Typographie */}
      <Titre3 className="mb-3 mt-6">Typographie — tailles</Titre3>
      <div className="d-flex flex-col gap-2">
        {FONT_SIZES.map((name) => (
          <div key={name} className="token-row">
            <span style={{ fontSize: `var(${name})`, lineHeight: 1 }}>Aa</span>
            <TokenName name={name} value={lengths[name]} />
          </div>
        ))}
      </div>

      <Titre3 className="mb-3 mt-6">Typographie — graisses</Titre3>
      <div className="d-flex flex-col gap-2">
        {FONT_WEIGHTS.map((name) => (
          <div key={name} className="token-row">
            <span style={{ fontWeight: `var(${name})` as never }}>Texte d'exemple</span>
            <TokenName name={name} value={raw[name]} />
          </div>
        ))}
      </div>

      {/* Espacement */}
      <Titre3 className="mb-3 mt-6">Espacement</Titre3>
      <div className="d-flex flex-col gap-2">
        {SPACINGS.map((name) => (
          <div key={name} className="token-row">
            <span className="token-bar" style={{ width: `var(${name})` }} />
            <TokenName name={name} value={lengths[name]} />
          </div>
        ))}
      </div>

      {/* Rayons */}
      <Titre3 className="mb-3 mt-6">Rayons de bordure</Titre3>
      <div className="token-grid">
        {RADII.map((name) => (
          <div key={name} className="token-swatch">
            <span className="token-radius" style={{ borderRadius: `var(${name})` }} />
            <TokenName name={name} value={lengths[name]} />
          </div>
        ))}
      </div>

      {/* Ombres */}
      <Titre3 className="mb-3 mt-6">Ombres</Titre3>
      <div className="token-grid">
        {SHADOWS.map((name) => (
          <div key={name} className="token-swatch">
            <span className="token-shadow" style={{ boxShadow: `var(${name})` }} />
            <TokenName name={name} />
          </div>
        ))}
      </div>

      {/* Tailles d'icônes */}
      <Titre3 className="mb-3 mt-6">Tailles d'icônes</Titre3>
      <div className="d-flex flex-col gap-2">
        {ICON_SIZES.map((name) => (
          <div key={name} className="token-row">
            <span
              className="token-icon"
              style={{ width: `var(${name})`, height: `var(${name})` }}
            />
            <TokenName name={name} value={lengths[name]} />
          </div>
        ))}
      </div>

      {/* Autres */}
      <Titre3 className="mb-3 mt-6">Transitions & z-index</Titre3>
      <div className="d-flex flex-col gap-2">
        {[...TRANSITIONS, ...Z_INDEX].map((name) => (
          <div key={name} className="token-row token-row--text">
            <TokenName name={name} value={raw[name]} />
          </div>
        ))}
      </div>
    </Card>
  );
}
