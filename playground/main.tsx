import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BaseStyle, Divider, Paper, SubText, Titre1 } from "../src";
import { DesignSystem, PackageInfo, Tokens } from "../src/DesignSystem";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Élément #root introuvable dans index.html");
}

createRoot(container).render(
  <StrictMode>
    <BaseStyle />
    <div className="min-h-screen bg-app py-10">
      <Paper className="d-flex flex-col gap-6 py-6">
        {/* En-tête */}
        <div>
          <Titre1>Design System</Titre1>
          <SubText>Micro-framework CSS / React — composants de base</SubText>
        </div>

        <Divider />

        {/* À propos du package */}
        <PackageInfo />

        {/* Présentation des composants */}
        <DesignSystem />

        <Divider label="Fondations" />

        {/* Design tokens */}
        <Tokens />
      </Paper>
    </div>
  </StrictMode>,
);
