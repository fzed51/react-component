# AGENTS.md

Conventions et contexte du projet à destination des agents IA (et des nouveaux contributeurs).

## Présentation

`@fzed51/react-component` est une **bibliothèque de composants React** (design system) publiée sur npm.
Elle est distribuée en dual **ESM / CJS** avec types TypeScript, et n'a qu'une seule dépendance
runtime : `clsx`.

- **React 19 requis** (`peerDependencies: react >=19`). Ne pas réintroduire de compatibilité React 18.
- Code, commentaires, documentation et messages de commit en **français**.

## Stack & outillage

| Domaine | Choix |
|---|---|
| Langage | TypeScript (strict) |
| Build | `tsc` direct — 3 cibles (`tsconfig.esm/cjs/types.json`) + copie CSS via `copyfiles` |
| Lint + format | **Biome** (`biome.json`) — pas d'ESLint ni Prettier |
| Tests | **Vitest** + Testing Library, environnement `jsdom` |
| Vitrine | Mini-playground **Vite** (`yarn dev`) montant `<DesignSystem />` |
| Gestionnaire de paquets | **Yarn 4** |

> Storybook a été retiré : la vitrine est désormais le playground Vite + le composant `DesignSystem`.

## Commandes

```bash
yarn dev            # playground Vite (visualisation des composants)
yarn test           # tests Vitest (run unique)
yarn test:watch     # tests en watch
yarn coverage       # couverture
yarn check          # Biome : lint + format (vérification)
yarn check:w        # Biome : applique les corrections
yarn build          # build complet ESM + CJS + types + CSS
```

Avant tout commit : `yarn check`, `yarn test` et `yarn build` doivent passer (c'est aussi ce que
vérifie la CI `.github/workflows/ci.yml`).

## Structure d'un composant

Chaque composant vit dans son dossier sous `src/common/` et suit **toujours** le même moule :

```
Composant/
  Composant.tsx   # implémentation
  types.ts        # types et interfaces de props
  Composant.css   # styles (importés depuis le .tsx)
  index.ts        # ré-export public
```

Respecter cette régularité pour tout nouveau composant, et l'exporter depuis `src/common/index.ts`.

## ⚠️ Règles lors d'une modification de composant

Toute création ou modification de composant (nouvelle prop, variante, comportement, API…) **doit**
s'accompagner systématiquement de :

1. **Mise à jour de la documentation** (`README.md`) — refléter la nouvelle API / le nouvel usage.
2. **Mise à jour du playground** (`src/DesignSystem/DesignSystem.tsx`) — y exposer le composant
   ou la variante modifiée, afin que la vitrine (`yarn dev` / GitHub Pages) reste à jour.
3. **Synchronisation du code affiché** — chaque exemple du playground est encapsulé dans
   `<Demo code={…}>`, où la prop `code` est un snippet **maintenu à la main** (il n'est pas extrait
   automatiquement du rendu). Dès qu'on modifie les éléments affichés d'une section, mettre à jour
   la chaîne `code` correspondante pour qu'elle reflète exactement ce qui est rendu.

Ne pas considérer une modification de composant comme terminée tant que ces trois points ne sont pas faits.

## Conventions de code

- **className** : composer avec `clsx`, toujours fusionner le `className` reçu en dernier.
- **Attributs natifs** : étendre les interfaces HTML (`ButtonHTMLAttributes`, etc.) et spreader
  `{...props}` sur l'élément. Placer les attributs « par défaut » du DS **avant** `{...props}`
  pour qu'ils restent surchargeables par le consommateur.
- **Refs (React 19)** : `ref` est une **prop normale**. Ne **pas** utiliser `forwardRef`.
  Déclarer `ref?: Ref<HTMLXElement>` dans `types.ts` et la déstructurer des props.
- **Variantes** : mapper les variantes/tailles vers des classes via des `Record<Variant, string>`.

## Pattern atomique / composé (formulaires)

- **Contrôles atomiques** : `InputText`, `InputTextarea`, `Selector` — rendent le contrôle HTML stylé.
- **Champs composés** : `InputTextField`, `TextareaField`, `SelectorField` — composent
  `FormGroup` + `Label` + contrôle. Ne pas dupliquer la logique : les champs composés réutilisent
  les contrôles atomiques.

## Accessibilité

- État `state="error"` → `aria-invalid` sur le contrôle.
- `FormGroup` génère les `id` des messages via la prop `fieldId` (`{fieldId}-error` / `{fieldId}-hint`) ;
  les champs composés relient le contrôle au message via `aria-describedby`.
- Conserver les `role="alert"` (erreurs), `role="status"` (chargement), `aria-hidden` (ornements).

## Design tokens

Toutes les valeurs visuelles dérivent de variables CSS définies dans `src/styles/base.css`
(couleurs via `color-mix`, échelle typographique via `calc` + `--font-scale`, espacements via
`--space-unit`). **Ne pas coder de valeurs en dur** dans les CSS de composants : utiliser les tokens.
`src/styles/helpers.css` fournit des utilitaires (type Tailwind) liés à ces tokens.

## Cas particulier : Table

`Table` est **volontairement** construit en **CSS Grid avec des `div` + rôles ARIA**
(`role="table/row/columnheader/cell"`) plutôt qu'en `<table>` sémantique, pour maîtriser la mise en
page (`gridTemplateColumns`) et le scroll infini (`IntersectionObserver`). Un override Biome scopé
désactive `useSemanticElements` et `useFocusableInteractive` sur ce fichier. **Ne pas « corriger »
ce pattern** en table sémantique sans discussion.

## Commits & versions

- **Conventional Commits** en français (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `ci:`…),
  suffixe `!` + trailer `BREAKING CHANGE:` pour une rupture.
- Versionnage via les scripts `publish:pat|min|maj` (bump → push → build → `npm publish`).
