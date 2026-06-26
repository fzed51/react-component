import { Badge, Card, SubText, Text, Titre2 } from "../common";
import "./PackageInfo.css";

const VERSION = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev";
const BUILD_DATE = typeof __BUILD_DATE__ !== "undefined" ? __BUILD_DATE__ : "";

function formatBuildDate(iso: string): string {
  if (!iso) return "build local";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "build local";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short" }).format(date);
}

/**
 * Carte de présentation du package : description, version et date de build
 * (injectées par Vite), et exemple d'installation / d'usage.
 * Réservée à la vitrine — non exportée par la bibliothèque.
 */
export function PackageInfo() {
  return (
    <Card>
      <div className="pkg__head">
        <Titre2>@fzed51/react-component</Titre2>
        <div className="pkg__meta">
          <Badge variant="primary">v{VERSION}</Badge>
          <SubText>Publié le {formatBuildDate(BUILD_DATE)}</SubText>
        </div>
      </div>

      <Text className="mt-3">
        Bibliothèque de composants React (design system) distribuée en double format ESM / CJS avec
        types TypeScript, et stylée via des design tokens CSS (voir la section{" "}
        <em>Design tokens</em> en bas de page).
      </Text>

      <ul className="pkg__points">
        <li>
          <Text size="sm">
            <strong>React 19 requis</strong> — <code>peerDependency react &gt;=19</code>.
          </Text>
        </li>
        <li>
          <Text size="sm">
            <strong>Une seule dépendance runtime</strong> : <code>clsx</code>.
          </Text>
        </li>
        <li>
          <Text size="sm">
            <strong>Double cible</strong> ESM / CJS + déclarations de types.
          </Text>
        </li>
      </ul>

      <SubText className="mb-1">Installation</SubText>
      <pre className="pkg__code">
        <code>npm install @fzed51/react-component</code>
      </pre>

      <SubText className="mb-1 mt-3">Usage</SubText>
      <pre className="pkg__code">
        <code>{`import { BaseStyle, Button } from "@fzed51/react-component";

function App() {
  return (
    <>
      <BaseStyle />
      <Button>Envoyer</Button>
    </>
  );
}`}</code>
      </pre>
    </Card>
  );
}
