# @fzed51/react-component

Bibliothèque de composants React (design system) publiée sur npm, distribuée en dual **ESM / CJS** avec types TypeScript. Elle fournit un jeu de composants primitifs (boutons, champs de formulaire, cartes, tableau…), des design tokens en variables CSS et des classes utilitaires composables. **React 19 requis**, une seule dépendance runtime (`clsx`).

```bash
npm install @fzed51/react-component
```

## 🎨 Playground

Une vitrine interactive présente tous les composants, leurs variantes et leur code d'exemple :

**👉 [fzed51.github.io/react-component](https://fzed51.github.io/react-component/)**

Le playground est déployé automatiquement sur GitHub Pages à chaque push sur `main`. En local, lancez-le avec `yarn dev`.

---

# Design System — Documentation

## Table des matières

1. [Architecture](#1-architecture)
2. [Variables de design (tokens)](#2-variables-de-design-tokens)
3. [Classes utilitaires (Helpers)](#3-classes-utilitaires-helpers)
4. [Composants](#4-composants)
   - [`<BaseStyle>`](#basestyle)
5. [Champs composés (input/)](#5-champs-composés-input)
6. [Tableau (`<Table>`)](#6-tableau-table)

---

## 1. Architecture

### Fonctionnement

Le CSS est chargé en **deux couches** :

| Couche          | Fichier                   | Rôle                                                                                 |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| **Base**        | `styles/base.css`         | Variables CSS (`--color-*`, `--space-*`…), reset, styles par défaut des balises HTML |
| **Utilitaires** | `styles/helpers.css`      | Classes utilitaires composables (`.d-flex`, `.gap-4`, `.text-sm`…)                   |
| **Composants**  | `Component/Component.css` | Styles propres à chaque composant, chargés à l'import du composant                   |

Les composants importent leur propre CSS directement dans leur fichier `.tsx`. Vite les bundle automatiquement — aucune importation manuelle n'est nécessaire côté consommateur.

### Importer les composants

```tsx
// Styles globaux — à placer une seule fois, avant l'arbre de composants
import { BaseStyle } from "@fzed51/react-component";

// Composants primitifs
import { Button, Card, FormGroup, InputText, InputTextarea, Label, Paper } from "@fzed51/react-component";

// Champs composés (FormGroup + Label + contrôle)
import { InputTextField, SelectorField, TextareaField } from "@fzed51/react-component";

// Import ciblé depuis un sous-module
import { Button } from "@fzed51/react-component";
```

```tsx
// Exemple d'intégration dans le point d'entrée de l'application
import { BaseStyle } from "@fzed51/react-component";

export function Root() {
  return (
    <>
      <BaseStyle />
      <App />
    </>
  );
}
```

### Personnaliser un composant

Chaque composant accepte `className` pour ajouter des classes supplémentaires (utilitaires ou custom) :

```tsx
<Card className="mt-4 shadow-md">…</Card>
<Button className="w-full">…</Button>
```

---

## 2. Variables de design (tokens)

Toutes les variables sont définies dans `src/styles/base.css` et accessibles via `var(--nom)`.

### Couleurs de base

| Variable               | Valeur    | Usage                              |
| ---------------------- | --------- | ---------------------------------- |
| `--color-primary`      | `#0a66c2` | Couleur principale (LinkedIn Blue) |
| `--color-secondary`    | `#057642` | Couleur secondaire (vert succès)   |
| `--color-warning`      | `#b36a00` | Avertissements                     |
| `--color-error`        | `#cc1016` | Erreurs                            |
| `--color-text-primary` | `#1c1c1c` | Texte principal                    |
| `--color-text-inverse` | `#ffffff` | Texte sur fond sombre              |
| `--color-bg-surface`   | `#ffffff` | Surface des cartes                 |
| `--color-bg-app`       | `#f3f2ef` | Fond de la page                    |

### Couleurs dérivées (calculées)

| Variable                 | Dérivée de            | Usage                   |
| ------------------------ | --------------------- | ----------------------- |
| `--color-primary-hover`  | primary + 40% noir    | Hover bouton primaire   |
| `--color-primary-light`  | primary + 82% blanc   | Fond teinté, focus ring |
| `--color-success`        | alias secondary       | Succès                  |
| `--color-success-light`  | alias secondary-light | Fond succès             |
| `--color-info`           | alias primary         | Info                    |
| `--color-text-secondary` | primary + 48% blanc   | Texte secondaire        |
| `--color-text-tertiary`  | primary + 62% blanc   | Texte discret           |
| `--color-text-disabled`  | primary + 73% blanc   | Texte désactivé         |
| `--color-bg-subtle`      | surface + 5% primary  | Fond très léger         |
| `--color-bg-muted`       | surface + 12% primary | Fond atténué            |
| `--color-border`         | surface + 22% primary | Bordure standard        |
| `--color-border-strong`  | alias text-disabled   | Bordure marquée         |
| `--color-border-focus`   | alias primary         | Contour focus           |

### Typographie

| Variable                 | Valeur             | Usage               |
| ------------------------ | ------------------ | ------------------- |
| `--font-size-base`       | `0.9375rem` (15px) | Taille de référence |
| `--font-scale`           | `1.25`             | Ratio Major Third   |
| `--font-size-xs`         | ≈ 9.6px            | Très petit          |
| `--font-size-sm`         | ≈ 12px             | Petit               |
| `--font-size-md`         | 15px               | Corps de texte      |
| `--font-size-lg`         | ≈ 18.75px          | Grand               |
| `--font-size-xl`         | ≈ 23.4px           | Très grand          |
| `--font-size-2xl`        | ≈ 29.3px           | Titre de section    |
| `--font-size-3xl`        | ≈ 36.6px           | Titre de page       |
| `--font-weight-light`    | 300                |                     |
| `--font-weight-regular`  | 400                |                     |
| `--font-weight-medium`   | 500                |                     |
| `--font-weight-semibold` | 600                |                     |
| `--font-weight-bold`     | 700                |                     |
| `--line-height-tight`    | 1.2                | Titres              |
| `--line-height-normal`   | 1.5                | Corps de texte      |
| `--line-height-loose`    | 1.8                | Contenu aéré        |

### Espacement

L'unité de base vaut `font-size-base / 3.75` ≈ **4px**.

| Variable     | Valeur approx. |
| ------------ | -------------- |
| `--space-1`  | 4px            |
| `--space-2`  | 8px            |
| `--space-3`  | 12px           |
| `--space-4`  | 16px           |
| `--space-5`  | 20px           |
| `--space-6`  | 24px           |
| `--space-8`  | 32px           |
| `--space-10` | 40px           |
| `--space-12` | 48px           |
| `--space-16` | 64px           |
| `--space-20` | 80px           |

### Rayons de bordure

| Variable        | Valeur |
| --------------- | ------ |
| `--radius-none` | 0      |
| `--radius-sm`   | ≈ 4px  |
| `--radius-md`   | ≈ 8px  |
| `--radius-lg`   | ≈ 12px |
| `--radius-xl`   | ≈ 16px |
| `--radius-full` | 9999px |

### Ombres

| Variable      | Usage     |
| ------------- | --------- |
| `--shadow-xs` | Subtile   |
| `--shadow-sm` | Cartes    |
| `--shadow-md` | Dropdowns |
| `--shadow-lg` | Modals    |
| `--shadow-xl` | Drawers   |

### Transitions

| Variable              | Valeur     |
| --------------------- | ---------- |
| `--transition-fast`   | 100ms ease |
| `--transition-normal` | 200ms ease |
| `--transition-slow`   | 350ms ease |

### Z-index

| Variable      | Valeur |
| ------------- | ------ |
| `--z-base`    | 0      |
| `--z-raised`  | 10     |
| `--z-overlay` | 100    |
| `--z-modal`   | 1000   |
| `--z-toast`   | 2000   |

---

## 3. Classes utilitaires (Helpers)

### Display

| Classe            | CSS                     |
| ----------------- | ----------------------- |
| `.d-none`         | `display: none`         |
| `.d-block`        | `display: block`        |
| `.d-inline`       | `display: inline`       |
| `.d-inline-block` | `display: inline-block` |
| `.d-flex`         | `display: flex`         |
| `.d-inline-flex`  | `display: inline-flex`  |
| `.d-grid`         | `display: grid`         |

### Flexbox

**Direction**

| Classe              | CSS                              |
| ------------------- | -------------------------------- |
| `.flex-row`         | `flex-direction: row`            |
| `.flex-row-reverse` | `flex-direction: row-reverse`    |
| `.flex-col`         | `flex-direction: column`         |
| `.flex-col-reverse` | `flex-direction: column-reverse` |

**Wrap**

| Classe               | CSS                       |
| -------------------- | ------------------------- |
| `.flex-wrap`         | `flex-wrap: wrap`         |
| `.flex-nowrap`       | `flex-wrap: nowrap`       |
| `.flex-wrap-reverse` | `flex-wrap: wrap-reverse` |

**Grow / Shrink**

| Classe         | CSS              |
| -------------- | ---------------- |
| `.flex-1`      | `flex: 1 1 0%`   |
| `.flex-auto`   | `flex: 1 1 auto` |
| `.flex-none`   | `flex: none`     |
| `.flex-grow`   | `flex-grow: 1`   |
| `.flex-shrink` | `flex-shrink: 1` |

**Justify Content**

| Classe             | CSS                              |
| ------------------ | -------------------------------- |
| `.justify-start`   | `justify-content: flex-start`    |
| `.justify-end`     | `justify-content: flex-end`      |
| `.justify-center`  | `justify-content: center`        |
| `.justify-between` | `justify-content: space-between` |
| `.justify-around`  | `justify-content: space-around`  |
| `.justify-evenly`  | `justify-content: space-evenly`  |

**Align Items**

| Classe            | CSS                       |
| ----------------- | ------------------------- |
| `.items-start`    | `align-items: flex-start` |
| `.items-end`      | `align-items: flex-end`   |
| `.items-center`   | `align-items: center`     |
| `.items-baseline` | `align-items: baseline`   |
| `.items-stretch`  | `align-items: stretch`    |

**Align Self**

| Classe          | CSS                      |
| --------------- | ------------------------ |
| `.self-start`   | `align-self: flex-start` |
| `.self-end`     | `align-self: flex-end`   |
| `.self-center`  | `align-self: center`     |
| `.self-stretch` | `align-self: stretch`    |

### Gap

`.gap-{n}`, `.gap-x-{n}`, `.gap-y-{n}` — valeurs disponibles : `0 1 2 3 4 5 6 8 10`

| Classe   | Valeur |
| -------- | ------ |
| `.gap-1` | ≈ 4px  |
| `.gap-2` | ≈ 8px  |
| `.gap-4` | ≈ 16px |
| `.gap-6` | ≈ 24px |

### Margin & Padding

**Margin** : `.m-{n}`, `.mt-{n}`, `.mb-{n}`, `.ml-{n}`, `.mr-{n}`, `.mx-{n}`, `.my-{n}`

**Padding** : `.p-{n}`, `.pt-{n}`, `.pb-{n}`, `.pl-{n}`, `.pr-{n}`, `.px-{n}`, `.py-{n}`

Valeurs `{n}` disponibles : `0 1 2 3 4 5 6 8` (et `10 12` pour margin-top).

Spéciaux : `.m-auto`, `.mx-auto`, `.my-auto`, `.ml-auto`, `.mr-auto`

### Largeur & Hauteur

| Classe          | CSS                   |
| --------------- | --------------------- |
| `.w-full`       | `width: 100%`         |
| `.w-auto`       | `width: auto`         |
| `.w-screen`     | `width: 100vw`        |
| `.w-fit`        | `width: fit-content`  |
| `.h-full`       | `height: 100%`        |
| `.h-screen`     | `height: 100vh`       |
| `.h-fit`        | `height: fit-content` |
| `.min-h-screen` | `min-height: 100vh`   |
| `.min-w-0`      | `min-width: 0`        |

### Position

| Classe      | CSS                        |
| ----------- | -------------------------- |
| `.relative` | `position: relative`       |
| `.absolute` | `position: absolute`       |
| `.fixed`    | `position: fixed`          |
| `.sticky`   | `position: sticky`         |
| `.static`   | `position: static`         |
| `.inset-0`  | `top/right/bottom/left: 0` |

### Overflow

`.overflow-hidden`, `.overflow-auto`, `.overflow-scroll`, `.overflow-visible`, `.overflow-x-auto`, `.overflow-y-auto`

### Typographie

**Alignement** : `.text-left`, `.text-center`, `.text-right`, `.text-justify`

**Taille** : `.text-xs`, `.text-sm`, `.text-md`, `.text-lg`, `.text-xl`, `.text-2xl`, `.text-3xl`

**Poids** : `.font-light`, `.font-regular`, `.font-medium`, `.font-semibold`, `.font-bold`

**Style** : `.italic`, `.not-italic`, `.underline`, `.line-through`, `.no-underline`, `.uppercase`, `.lowercase`, `.capitalize`, `.normal-case`, `.truncate`, `.whitespace-nowrap`, `.break-word`

**Couleur de texte** : `.text-primary`, `.text-secondary`, `.text-tertiary`, `.text-disabled`, `.text-inverse`, `.text-link`, `.text-success`, `.text-warning`, `.text-error`, `.text-info`

### Fond (Background)

`.bg-app`, `.bg-surface`, `.bg-subtle`, `.bg-muted`, `.bg-dark`, `.bg-primary`, `.bg-success`, `.bg-warning`, `.bg-error`, `.bg-info`

### Bordures

**Bordure** : `.border`, `.border-0`, `.border-top`, `.border-bottom`, `.border-left`, `.border-right`

**Rayon** : `.rounded-none`, `.rounded-sm`, `.rounded-md`, `.rounded-lg`, `.rounded-xl`, `.rounded-full`

### Ombres

`.shadow-none`, `.shadow-xs`, `.shadow-sm`, `.shadow-md`, `.shadow-lg`, `.shadow-xl`

### Opacité

`.opacity-0`, `.opacity-25`, `.opacity-50`, `.opacity-75`, `.opacity-100`

### Curseur

`.cursor-pointer`, `.cursor-default`, `.cursor-not-allowed`, `.cursor-text`

### Divers

| Classe                 | CSS                                              |
| ---------------------- | ------------------------------------------------ |
| `.pointer-events-none` | `pointer-events: none`                           |
| `.pointer-events-auto` | `pointer-events: auto`                           |
| `.select-none`         | `user-select: none`                              |
| `.select-text`         | `user-select: text`                              |
| `.select-all`          | `user-select: all`                               |
| `.sr-only`             | Visually hidden, accessible aux lecteurs d'écran |

---

## 4. Composants

### Styles globaux

---

#### `<BaseStyle>`

Injecte les styles globaux du design system (`base.css` + `helpers.css`) : variables CSS, reset et classes utilitaires.
À placer **une seule fois** dans l'arbre, avant les composants de l'application.

```tsx
import { BaseStyle } from "@fzed51/react-component";

export function Root() {
  return (
    <>
      <BaseStyle />
      <App />
    </>
  );
}
```

Ce composant ne rend **aucun élément DOM** (`return null`). L'injection CSS est effectuée par le bundler au chargement du module.

| Prop | Type | Description |
| ---- | ---- | ----------- |
| —    | —    | Aucune prop |

---

### Typographie

---

#### `<Titre1>`

Titre principal de page — `<h1>`.

```tsx
<Titre1>Mon titre de page</Titre1>
```

| Prop        | Type                                 | Défaut | Description                |
| ----------- | ------------------------------------ | ------ | -------------------------- |
| `children`  | `ReactNode`                          | —      | Contenu                    |
| `className` | `string`                             | `""`   | Classes CSS additionnelles |
| `...props`  | `HTMLAttributes<HTMLHeadingElement>` | —      | Attributs HTML natifs      |

---

#### `<Titre2>`

Titre de section — `<h2>`.

```tsx
<Titre2>Ma section</Titre2>
```

| Prop        | Type                                 | Défaut | Description                |
| ----------- | ------------------------------------ | ------ | -------------------------- |
| `children`  | `ReactNode`                          | —      | Contenu                    |
| `className` | `string`                             | `""`   | Classes CSS additionnelles |
| `...props`  | `HTMLAttributes<HTMLHeadingElement>` | —      | Attributs HTML natifs      |

---

#### `<Titre3>`

Titre de sous-section — `<h3>`.

| Prop        | Type                                 | Défaut | Description                |
| ----------- | ------------------------------------ | ------ | -------------------------- |
| `children`  | `ReactNode`                          | —      | Contenu                    |
| `className` | `string`                             | `""`   | Classes CSS additionnelles |
| `...props`  | `HTMLAttributes<HTMLHeadingElement>` | —      | Attributs HTML natifs      |

---

#### `<Text>`

Texte courant avec variantes de couleur, taille et balise HTML.

```tsx
<Text variant="secondary" size="sm">Texte discret</Text>
<Text inline variant="error">Champ invalide</Text>
```

| Prop        | Type                                                                                       | Défaut      | Description                |
| ----------- | ------------------------------------------------------------------------------------------ | ----------- | -------------------------- |
| `children`  | `ReactNode`                                                                                | —           | Contenu                    |
| `variant`   | `"primary" \| "secondary" \| "tertiary" \| "inverse" \| "error" \| "success" \| "warning"` | `"primary"` | Couleur                    |
| `size`      | `"xs" \| "sm" \| "md" \| "lg"`                                                             | `"md"`      | Taille                     |
| `box`       | `boolean`                                                                                  | `false`     | Rendre comme `<div>`       |
| `inline`    | `boolean`                                                                                  | `false`     | Rendre comme `<span>`      |
| `className` | `string`                                                                                   | `""`        | Classes CSS additionnelles |
| `...props`  | `HTMLAttributes<HTMLElement>`                                                              | —           | Attributs HTML natifs      |

---

#### `<SubText>`

Texte secondaire / légende — `<small>`, couleur atténuée.

```tsx
<SubText variant="muted">Mis à jour il y a 2 heures</SubText>
```

| Prop        | Type                                                        | Défaut      | Description                |
| ----------- | ----------------------------------------------------------- | ----------- | -------------------------- |
| `children`  | `ReactNode`                                                 | —           | Contenu                    |
| `variant`   | `"default" \| "muted" \| "error" \| "success" \| "warning"` | `"default"` | Couleur                    |
| `className` | `string`                                                    | `""`        | Classes CSS additionnelles |
| `...props`  | `HTMLAttributes<HTMLElement>`                               | —           | Attributs HTML natifs      |

---

#### `<Badge>`

Étiquette / pastille de statut.

```tsx
<Badge variant="success">Actif</Badge>
<Badge variant="warning" size="sm">En attente</Badge>
```

| Prop        | Type                                                                    | Défaut      | Description                |
| ----------- | ----------------------------------------------------------------------- | ----------- | -------------------------- |
| `children`  | `ReactNode`                                                             | —           | Contenu                    |
| `variant`   | `"default" \| "primary" \| "success" \| "warning" \| "error" \| "info"` | `"default"` | Style visuel               |
| `size`      | `"sm" \| "md"`                                                          | `"md"`      | Taille                     |
| `className` | `string`                                                                | `""`        | Classes CSS additionnelles |
| `...props`  | `HTMLAttributes<HTMLSpanElement>`                                       | —           | Attributs HTML natifs      |

---

### Mise en page

---

#### `<Card>`

Cadre principal — surface blanche avec ombre et bords arrondis.

```tsx
<Card>
  <Titre2>Mon contenu</Titre2>
</Card>

<Card noPadding>
  <img src="…" />
</Card>
```

| Prop        | Type                             | Défaut  | Description                 |
| ----------- | -------------------------------- | ------- | --------------------------- |
| `children`  | `ReactNode`                      | —       | Contenu                     |
| `noPadding` | `boolean`                        | `false` | Supprime le padding interne |
| `className` | `string`                         | `""`    | Classes CSS additionnelles  |
| `...props`  | `HTMLAttributes<HTMLDivElement>` | —       | Attributs HTML natifs       |

---

#### `<SubCard>`

Sous-cadre — surface interne d'une `Card`, fond légèrement teinté.

```tsx
<Card>
  <SubCard variant="subtle">Contenu secondaire</SubCard>
</Card>
```

| Prop        | Type                               | Défaut      | Description                |
| ----------- | ---------------------------------- | ----------- | -------------------------- |
| `children`  | `ReactNode`                        | —           | Contenu                    |
| `variant`   | `"default" \| "subtle" \| "muted"` | `"default"` | Teinte de fond             |
| `className` | `string`                           | `""`        | Classes CSS additionnelles |
| `...props`  | `HTMLAttributes<HTMLDivElement>`   | —           | Attributs HTML natifs      |

---

#### `<Divider>`

Ligne de séparation visuelle.

```tsx
<Divider />
<Divider orientation="vertical" />
<Divider label="ou" />
```

| Prop          | Type                            | Défaut         | Description                     |
| ------------- | ------------------------------- | -------------- | ------------------------------- |
| `orientation` | `"horizontal" \| "vertical"`    | `"horizontal"` | Sens du séparateur              |
| `label`       | `string`                        | —              | Texte centré (variante labeled) |
| `className`   | `string`                        | `""`           | Classes CSS additionnelles      |
| `...props`    | `HTMLAttributes<HTMLHRElement>` | —              | Attributs HTML natifs           |

---

#### `<Paper>`

Zone centrale de mise en page. Centre le contenu horizontalement et limite la largeur à **1000px**. À utiliser comme conteneur racine d'une page.

```tsx
// Page complète
<div className="min-h-screen bg-app">
  <Paper>
    <Titre1>Ma page</Titre1>
    <Card>…</Card>
  </Paper>
</div>

// Avec classes utilitaires
<Paper className="d-flex flex-col gap-6 py-8">
  …
</Paper>
```

| Prop        | Type                             | Défaut | Description                |
| ----------- | -------------------------------- | ------ | -------------------------- |
| `children`  | `ReactNode`                      | —      | Contenu de la page         |
| `className` | `string`                         | `""`   | Classes CSS additionnelles |
| `...props`  | `HTMLAttributes<HTMLDivElement>` | —      | Attributs HTML natifs      |

---

### Formulaires

---

#### `<Label>`

Libellé de champ de formulaire. L'association avec le champ via `htmlFor` est **obligatoire**.

```tsx
<Label htmlFor="email" required>Adresse e-mail</Label>
<InputText id="email" type="email" />
```

| Prop        | Type                                    | Défaut     | Description                |
| ----------- | --------------------------------------- | ---------- | -------------------------- |
| `children`  | `ReactNode`                             | —          | Texte du label             |
| `htmlFor`   | `string`                                | **requis** | ID du champ associé        |
| `required`  | `boolean`                               | —          | Affiche un astérisque `*`  |
| `className` | `string`                                | `""`       | Classes CSS additionnelles |
| `...props`  | `LabelHTMLAttributes<HTMLLabelElement>` | —          | Attributs HTML natifs      |

---

#### `<FormGroup>`

Conteneur de champ de formulaire. Regroupe `Label`, contrôle, message d'erreur ou d'aide.

```tsx
<FormGroup error="Ce champ est obligatoire">
  <Label htmlFor="email" required>Email</Label>
  <InputText id="email" type="email" state="error" />
</FormGroup>

<FormGroup hint="Format : JJ/MM/AAAA">
  <Label htmlFor="date">Date de naissance</Label>
  <InputText id="date" />
</FormGroup>
```

| Prop        | Type                             | Défaut | Description                                      |
| ----------- | -------------------------------- | ------ | ------------------------------------------------ |
| `children`  | `ReactNode`                      | —      | Contenu (Label + contrôle)                       |
| `error`     | `string`                         | —      | Message d'erreur (remplace hint, passe en rouge) |
| `hint`      | `string`                         | —      | Message d'aide (affiché si pas d'erreur)         |
| `className` | `string`                         | `""`   | Classes CSS additionnelles                       |
| `...props`  | `HTMLAttributes<HTMLDivElement>` | —      | Attributs HTML natifs                            |

---

#### `<InputText>`

Champ de saisie texte. Compatible `forwardRef`.

```tsx
<InputText type="email" placeholder="vous@exemple.com" />
<InputText state="error" size="lg" />
```

| Prop        | Type                                    | Défaut      | Description                         |
| ----------- | --------------------------------------- | ----------- | ----------------------------------- |
| `state`     | `"default" \| "error" \| "success"`     | `"default"` | Variante visuelle d'état            |
| `size`      | `"sm" \| "md" \| "lg"`                  | `"md"`      | Taille du champ                     |
| `className` | `string`                                | `""`        | Classes CSS additionnelles          |
| `ref`       | `Ref<HTMLInputElement>`                 | —           | Référence sur l'élément             |
| `...props`  | `InputHTMLAttributes<HTMLInputElement>` | —           | Tous les attributs `<input>` natifs |

---

#### `<InputTextarea>`

Champ de saisie multiligne. Miroir de `<InputText>` pour les `<textarea>`. Compatible `forwardRef`.

```tsx
<InputTextarea placeholder="Décrivez votre expérience…" rows={4} />
<InputTextarea state="error" size="lg" />
```

| Prop        | Type                                          | Défaut      | Description                            |
| ----------- | --------------------------------------------- | ----------- | -------------------------------------- |
| `state`     | `"default" \| "error" \| "success"`           | `"default"` | Variante visuelle d'état               |
| `size`      | `"sm" \| "md" \| "lg"`                        | `"md"`      | Taille du champ                        |
| `className` | `string`                                      | `""`        | Classes CSS additionnelles             |
| `ref`       | `Ref<HTMLTextAreaElement>`                    | —           | Référence sur l'élément                |
| `...props`  | `TextareaHTMLAttributes<HTMLTextAreaElement>` | —           | Tous les attributs `<textarea>` natifs |

---

#### `<InputGroup>`

Entoure un `InputText` avec un préfixe (icône, texte) et/ou un suffixe.

```tsx
<InputGroup prefix={<SearchIcon />}>
  <InputText placeholder="Rechercher…" />
</InputGroup>

<InputGroup suffix={<span>€</span>}>
  <InputText type="number" placeholder="Montant" />
</InputGroup>
```

| Prop        | Type                             | Défaut | Description                       |
| ----------- | -------------------------------- | ------ | --------------------------------- |
| `children`  | `ReactNode`                      | —      | Contrôle de saisie (`InputText`…) |
| `prefix`    | `ReactNode`                      | —      | Élément avant l'input             |
| `suffix`    | `ReactNode`                      | —      | Élément après l'input             |
| `className` | `string`                         | `""`   | Classes CSS additionnelles        |
| `...props`  | `HTMLAttributes<HTMLDivElement>` | —      | Attributs HTML natifs             |

---

#### `<Selector>`

Liste déroulante. Compatible `forwardRef`.

```tsx
<Selector placeholder="Choisir un pays">
  <option value="fr">France</option>
  <option value="be">Belgique</option>
</Selector>

<Selector state="error" size="lg" defaultValue="">
  <option value="" disabled>-- Sélectionner --</option>
  <option value="a">Option A</option>
</Selector>
```

| Prop          | Type                                      | Défaut      | Description                         |
| ------------- | ----------------------------------------- | ----------- | ----------------------------------- |
| `children`    | `ReactNode`                               | —           | Éléments `<option>`                 |
| `state`       | `"default" \| "error" \| "success"`       | `"default"` | Variante visuelle d'état            |
| `size`        | `"sm" \| "md" \| "lg"`                    | `"md"`      | Taille                              |
| `placeholder` | `string`                                  | —           | Option disabled affichée en premier |
| `className`   | `string`                                  | `""`        | Classes CSS additionnelles          |
| `ref`         | `Ref<HTMLSelectElement>`                  | —           | Référence sur le `<select>`         |
| `...props`    | `SelectHTMLAttributes<HTMLSelectElement>` | —           | Attributs `<select>` natifs         |

---

#### `<Checkbox>`

Case à cocher déclinée en deux formes via `variant` : `"checkbox"` (case à cocher) ou `"switch"` (interrupteur). Le `<label>` enveloppe le contrôle : cliquer le libellé bascule l'état. Compatible `forwardRef`.

```tsx
<Checkbox label="J'accepte les conditions" />
<Checkbox variant="switch" label="Activer les notifications" defaultChecked />
<Checkbox size="lg" state="error" label="Obligatoire" />
```

> L'état `error` / `success` reste visible **même une fois la case cochée** (remplissage rouge / vert), afin que le signal de validation ne soit jamais masqué par la couleur « coché ». C'est au consommateur de retirer `state` quand l'erreur est résolue.

| Prop        | Type                                                          | Défaut       | Description                              |
| ----------- | ------------------------------------------------------------- | ------------ | ---------------------------------------- |
| `variant`   | `"checkbox" \| "switch"`                                      | `"checkbox"` | Forme du contrôle                        |
| `state`     | `"default" \| "error" \| "success"`                           | `"default"`  | Variante visuelle d'état                 |
| `size`      | `"sm" \| "md" \| "lg"`                                        | `"md"`       | Taille du contrôle et du libellé         |
| `label`     | `ReactNode`                                                   | —            | Libellé affiché à côté du contrôle       |
| `className` | `string`                                                      | `""`         | Classes CSS additionnelles               |
| `ref`       | `Ref<HTMLInputElement>`                                       | —            | Référence sur l'`<input>`                |
| `...props`  | `InputHTMLAttributes<HTMLInputElement>` *(sauf `size`, `type`)* | —          | Attributs `<input>` natifs (`checked`, `disabled`, `onChange`…) |

---

#### `<Radio>` & `<RadioGroup>`

Choix **unique et exclusif** dans un ensemble. `Radio` est le contrôle atomique (pastille ronde) ; en pratique on utilise `RadioGroup`, qui pilote l'exclusivité (un `name` partagé), la sélection et la disposition. Pour un champ complet avec libellé de groupe et message, voir [`<RadioGroupField>`](#radiogroupfield).

```tsx
const planOptions = [
  { value: "free", label: "Gratuit" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Entreprise" },
];

{/* Non contrôlé */}
<RadioGroup name="plan" options={planOptions} defaultValue="pro" />

{/* Contrôlé */}
<RadioGroup name="plan" options={planOptions} value={plan} onChange={setPlan} />

{/* Dispositions */}
<RadioGroup name="plan" layout="inline" options={planOptions} />
<RadioGroup name="plan" layout="grid" columns={3} options={planOptions} />
```

La prop `layout` propose trois dispositions : `"stack"` (colonne, défaut), `"inline"` (ligne avec passage automatique à la ligne) et `"grid"` (grille de `columns` colonnes, `2` par défaut). L'état `error` / `success` est propagé au groupe (`aria-invalid`) et à chaque option ; il reste visible même une fois l'option sélectionnée.

`RadioGroup` :

| Prop           | Type                                                       | Défaut      | Description                                          |
| -------------- | ---------------------------------------------------------- | ----------- | ---------------------------------------------------- |
| `name`         | `string`                                                   | —           | Nom partagé garantissant l'exclusivité (obligatoire) |
| `options`      | `RadioOption[]`                                            | —           | Options `{ value, label, disabled? }`                |
| `value`        | `string`                                                   | —           | Valeur sélectionnée (mode contrôlé)                  |
| `defaultValue` | `string`                                                   | —           | Valeur initiale (mode non contrôlé)                  |
| `onChange`     | `(value: string, event) => void`                           | —           | Appelé avec la valeur de l'option choisie            |
| `layout`       | `"stack" \| "inline" \| "grid"`                            | `"stack"`   | Disposition des options                              |
| `columns`      | `number`                                                   | `2`         | Nombre de colonnes (avec `layout="grid"`)            |
| `size`         | `"sm" \| "md" \| "lg"`                                     | `"md"`      | Taille des contrôles                                 |
| `state`        | `"default" \| "error" \| "success"`                        | `"default"` | État visuel appliqué à tout le groupe                |
| `disabled`     | `boolean`                                                  | `false`     | Désactive tout le groupe                             |
| `className`    | `string`                                                   | `""`        | Classes CSS additionnelles                           |
| `ref`          | `Ref<HTMLDivElement>`                                      | —           | Référence sur le conteneur du groupe                 |

`Radio` (atomique) accepte `size`, `state`, `label`, `ref` et tous les attributs `<input>` natifs (sauf `size`, `type`).

---

#### `<Button>`

Bouton avec variantes de style et de taille.

```tsx
<Button>Envoyer</Button>
<Button variant="secondary" size="sm">Annuler</Button>
<Button variant="danger" loading>Suppression…</Button>
<Button variant="ghost" fullWidth>Voir plus</Button>
```

| Prop        | Type                                                           | Défaut      | Description                             |
| ----------- | -------------------------------------------------------------- | ----------- | --------------------------------------- |
| `children`  | `ReactNode`                                                    | —           | Contenu                                 |
| `variant`   | `"primary" \| "secondary" \| "ghost" \| "danger" \| "outline"` | `"primary"` | Style visuel                            |
| `size`      | `"sm" \| "md" \| "lg"`                                         | `"md"`      | Taille                                  |
| `fullWidth` | `boolean`                                                      | `false`     | Prend toute la largeur                  |
| `loading`   | `boolean`                                                      | `false`     | Affiche un spinner, désactive le bouton |
| `disabled`  | `boolean`                                                      | —           | Désactive le bouton                     |
| `className` | `string`                                                       | `""`        | Classes CSS additionnelles              |
| `...props`  | `ButtonHTMLAttributes<HTMLButtonElement>`                      | —           | Attributs `<button>` natifs             |

---

### Exemple complet — Formulaire de connexion

```tsx
import {
  Card, Titre2, FormGroup, Label,
  InputText, Button, Divider, SubText
} from "@fzed51/react-component";

export function LoginForm() {
  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Titre2>Connexion</Titre2>

      <FormGroup className="mt-6">
        <Label htmlFor="email" required>Email</Label>
        <InputText id="email" type="email" placeholder="vous@exemple.com" />
      </FormGroup>

      <FormGroup className="mt-4" hint="Au moins 8 caractères">
        <Label htmlFor="password" required>Mot de passe</Label>
        <InputText id="password" type="password" />
      </FormGroup>

      <Button className="mt-6" fullWidth>
        Se connecter
      </Button>

      <Divider label="ou" className="my-4" />

      <SubText variant="muted" className="text-center">
        Pas encore de compte ?
      </SubText>
    </Card>
  );
}
```

---

## 5. Champs composés (input/)

Les champs composés encapsulent le pattern `FormGroup > Label + contrôle` dans un composant unique.
Ils sont disponibles depuis `@fzed51/react-component`.

> **Comportement commun**
> - Si `error` est fourni, l'état du contrôle interne passe automatiquement à `"error"`.
> - Tous les composants sont compatibles `forwardRef` (React Hook Form, etc.).
> - Tous les props natifs du contrôle sous-jacent sont transmis via `...props`.

---

#### `<InputTextField>`

`FormGroup > Label + InputText`. Fonctionne avec tous les types `<input>` HTML (`text`, `email`, `password`, `number`, `date`, `tel`…).

```tsx
<InputTextField id="email" label="Email" type="email" required />
<InputTextField id="age" label="Âge" type="number" hint="Entre 18 et 99 ans" />
<InputTextField id="pwd" label="Mot de passe" type="password" error="Mot de passe incorrect" />
```

| Prop       | Type                                                    | Défaut      | Description                                      |
| ---------- | ------------------------------------------------------- | ----------- | ------------------------------------------------ |
| `id`       | `string`                                                | **requis**  | Lie le `<label>` et l'`<input>`                  |
| `label`    | `string`                                                | **requis**  | Texte du label                                   |
| `error`    | `string`                                                | —           | Message d'erreur — force l'état `"error"`        |
| `hint`     | `string`                                                | —           | Message d'aide (masqué si `error` présent)       |
| `state`    | `"default" \| "error" \| "success"`                     | `"default"` | État visuel (ignoré si `error` est fourni)       |
| `size`     | `"sm" \| "md" \| "lg"`                                  | `"md"`      | Taille du champ                                  |
| `required` | `boolean`                                               | —           | Affiche `*` sur le label, passe `required` natif |
| `ref`      | `Ref<HTMLInputElement>`                                 | —           | Référence sur l'`<input>`                        |
| `...props` | `InputHTMLAttributes<HTMLInputElement>` *(sauf `size`)* | —           | Tous les attributs `<input>` natifs              |

---

#### `<SelectorField>`

`FormGroup > Label + Selector`.

```tsx
<SelectorField id="country" label="Pays" required placeholder="Choisir un pays">
  <option value="fr">France</option>
  <option value="be">Belgique</option>
  <option value="ch">Suisse</option>
</SelectorField>

<SelectorField id="type" label="Type" error="Champ obligatoire">
  <option value="a">Option A</option>
</SelectorField>
```

| Prop          | Type                                                      | Défaut      | Description                                      |
| ------------- | --------------------------------------------------------- | ----------- | ------------------------------------------------ |
| `id`          | `string`                                                  | **requis**  | Lie le `<label>` et le `<select>`                |
| `label`       | `string`                                                  | **requis**  | Texte du label                                   |
| `children`    | `ReactNode`                                               | —           | Éléments `<option>`                              |
| `error`       | `string`                                                  | —           | Message d'erreur — force l'état `"error"`        |
| `hint`        | `string`                                                  | —           | Message d'aide (masqué si `error` présent)       |
| `state`       | `"default" \| "error" \| "success"`                       | `"default"` | État visuel (ignoré si `error` est fourni)       |
| `size`        | `"sm" \| "md" \| "lg"`                                    | `"md"`      | Taille                                           |
| `placeholder` | `string`                                                  | —           | Option disabled affichée en premier              |
| `required`    | `boolean`                                                 | —           | Affiche `*` sur le label, passe `required` natif |
| `ref`         | `Ref<HTMLSelectElement>`                                  | —           | Référence sur le `<select>`                      |
| `...props`    | `SelectHTMLAttributes<HTMLSelectElement>` *(sauf `size`)* | —           | Attributs `<select>` natifs                      |

---

#### `<TextareaField>`

`FormGroup > Label + InputTextarea`.

```tsx
<TextareaField id="bio" label="Biographie" rows={4} hint="Max 500 caractères." />
<TextareaField id="notes" label="Notes" required error="Ce champ est obligatoire" />
```

| Prop       | Type                                          | Défaut      | Description                                      |
| ---------- | --------------------------------------------- | ----------- | ------------------------------------------------ |
| `id`       | `string`                                      | **requis**  | Lie le `<label>` et le `<textarea>`              |
| `label`    | `string`                                      | **requis**  | Texte du label                                   |
| `error`    | `string`                                      | —           | Message d'erreur — force l'état `"error"`        |
| `hint`     | `string`                                      | —           | Message d'aide (masqué si `error` présent)       |
| `state`    | `"default" \| "error" \| "success"`           | `"default"` | État visuel (ignoré si `error` est fourni)       |
| `size`     | `"sm" \| "md" \| "lg"`                        | `"md"`      | Taille du champ                                  |
| `required` | `boolean`                                     | —           | Affiche `*` sur le label, passe `required` natif |
| `ref`      | `Ref<HTMLTextAreaElement>`                    | —           | Référence sur le `<textarea>`                    |
| `...props` | `TextareaHTMLAttributes<HTMLTextAreaElement>` | —           | Attributs `<textarea>` natifs                    |

---

#### `<CheckboxField>`

`FormGroup > Checkbox + message`. Contrairement aux autres champs, le label est **adjacent** au contrôle (intégré au `Checkbox`) ; le champ relie directement le message d'erreur / d'aide via `aria-describedby`. Hérite de toutes les props de `<Checkbox>` (`variant`, `size`, `state`…).

```tsx
<CheckboxField id="cgu" label="J'accepte les conditions" required error="Champ obligatoire" />
<CheckboxField id="notif" variant="switch" label="Notifications" hint="Modifiable plus tard." />
```

| Prop       | Type                                                              | Défaut       | Description                                      |
| ---------- | ---------------------------------------------------------------- | ------------ | ------------------------------------------------ |
| `id`       | `string`                                                         | **requis**   | Lie le label et l'`<input>`                      |
| `label`    | `ReactNode`                                                      | **requis**   | Libellé affiché à côté du contrôle               |
| `variant`  | `"checkbox" \| "switch"`                                         | `"checkbox"` | Forme du contrôle                                |
| `error`    | `string`                                                         | —            | Message d'erreur — force l'état `"error"`        |
| `hint`     | `string`                                                         | —            | Message d'aide (masqué si `error` présent)       |
| `state`    | `"default" \| "error" \| "success"`                              | `"default"`  | État visuel (ignoré si `error` est fourni)       |
| `size`     | `"sm" \| "md" \| "lg"`                                           | `"md"`       | Taille du contrôle                               |
| `required` | `boolean`                                                        | —            | Affiche `*` sur le label, passe `required` natif |
| `ref`      | `Ref<HTMLInputElement>`                                          | —            | Référence sur l'`<input>`                        |
| `...props` | `InputHTMLAttributes<HTMLInputElement>` *(sauf `size`, `type`)*  | —            | Attributs `<input>` natifs                       |

---

#### `<RadioGroupField>`

`FormGroup > légende + RadioGroup + message`. Champ de choix unique : l'erreur porte sur le **groupe entier** (et non sur une option). La légende est reliée au groupe via `aria-labelledby` et le message via `aria-describedby`. Hérite de toutes les props de [`<RadioGroup>`](#radio--radiogroup) (`options`, `value`, `defaultValue`, `onChange`, `layout`, `columns`, `size`…). Le `name` partagé prend par défaut la valeur de `id`.

```tsx
const planOptions = [
  { value: "free", label: "Gratuit" },
  { value: "pro", label: "Pro" },
];

<RadioGroupField id="plan" label="Formule" layout="inline" defaultValue="pro" options={planOptions} />
<RadioGroupField id="plan" label="Formule" required error="Choix obligatoire" options={planOptions} />
```

| Prop       | Type                                | Défaut      | Description                                            |
| ---------- | ----------------------------------- | ----------- | ----------------------------------------------------- |
| `id`       | `string`                            | **requis**  | Lie la légende et les messages au groupe              |
| `label`    | `ReactNode`                         | **requis**  | Libellé du groupe (légende)                           |
| `name`     | `string`                            | `id`        | Nom partagé des boutons radio                         |
| `options`  | `RadioOption[]`                     | **requis**  | Options `{ value, label, disabled? }`                 |
| `error`    | `string`                            | —           | Message d'erreur — force l'état `"error"` du groupe   |
| `hint`     | `string`                            | —           | Message d'aide (masqué si `error` présent)            |
| `state`    | `"default" \| "error" \| "success"` | `"default"` | État visuel (ignoré si `error` est fourni)            |
| `layout`   | `"stack" \| "inline" \| "grid"`     | `"stack"`   | Disposition des options                               |
| `required` | `boolean`                           | —           | Affiche `*` sur la légende                            |
| `ref`      | `Ref<HTMLDivElement>`               | —           | Référence sur le conteneur du groupe                  |
| `...props` | props de `<RadioGroup>` *(sauf `name`)* | —       | `value`, `defaultValue`, `onChange`, `columns`, `size`… |

---

### Exemple complet — Formulaire avec champs composés

```tsx
import { Card, Titre2, Button, Divider } from "@fzed51/react-component";
import { InputTextField, SelectorField, TextareaField } from "@fzed51/react-component";

export function ProfileForm() {
  return (
    <Card className="mx-auto" style={{ maxWidth: 480 }}>
      <Titre2>Mon profil</Titre2>

      <div className="d-flex flex-col gap-4 mt-6">
        <InputTextField
          id="name"
          label="Nom complet"
          placeholder="Jean Dupont"
          required
          hint="Votre prénom et nom de famille."
        />

        <InputTextField
          id="email"
          label="Email"
          type="email"
          placeholder="vous@exemple.com"
          required
        />

        <SelectorField
          id="country"
          label="Pays"
          required
          placeholder="Choisir un pays"
        >
          <option value="fr">France</option>
          <option value="be">Belgique</option>
          <option value="ch">Suisse</option>
        </SelectorField>

        <TextareaField
          id="bio"
          label="Biographie"
          placeholder="Parlez-nous de vous…"
          hint="Max 500 caractères."
          rows={4}
        />

        <Button fullWidth>Enregistrer</Button>
      </div>
    </Card>
  );
}
```

---

## 6. Tableau (`<Table>`)

Tableau générique basé sur **CSS Grid** avec affichage progressif (infinite scroll) intégré.

### Import

```tsx
import { Table } from "@fzed51/react-component";
import type { TableColumn } from "@fzed51/react-component";
```

### Utilisation de base

```tsx
type User = { id: number; name: string; role: string };

const columns: TableColumn<User>[] = [
  { key: "id",   header: "#",    accessor: "id",   width: "60px", align: "center" },
  { key: "name", header: "Nom",  accessor: "name" },
  { key: "role", header: "Rôle", accessor: "role", width: "120px" },
];

const data: User[] = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob",   role: "Éditeur" },
];

<Table<User> columns={columns} data={data} getRowKey={(row) => row.id} />
```

### Props de `<Table>`

| Prop           | Type                                    | Défaut            | Description                                                                 |
| -------------- | --------------------------------------- | ----------------- | --------------------------------------------------------------------------- |
| `columns`      | `TableColumn<T>[]`                      | **requis**        | Définition des colonnes                                                     |
| `data`         | `T[]`                                   | **requis**        | Tableau de données                                                          |
| `striped`      | `boolean`                               | `false`           | Lignes alternées (zebrées)                                                  |
| `bordered`     | `boolean`                               | `false`           | Bordures verticales entre colonnes                                          |
| `size`         | `"sm" \| "md" \| "lg"`                 | `"md"`            | Densité des cellules                                                        |
| `caption`      | `string`                                | —                 | Légende affichée au-dessus du tableau                                       |
| `emptyLabel`   | `string`                                | `"Aucune donnée"` | Message affiché quand `data` est vide                                       |
| `loadingLabel` | `string`                                | `"Chargement…"`   | Texte du sentinel d'affichage progressif                                    |
| `pageSize`     | `number`                                | `20`              | Lignes rendues par lot. `<= 0` désactive l'affichage progressif (tout affiché) |
| `getRowKey`    | `(row: T, index: number) => string \| number` | —           | Clé unique par ligne (recommandé)                                           |
| `className`    | `string`                                | `""`              | Classes CSS additionnelles sur le wrapper                                   |
| `...props`     | `HTMLAttributes<HTMLDivElement>`        | —                 | Attributs HTML natifs sur le wrapper                                        |

### `TableColumn<T>`

| Prop       | Type                                               | Description                                                    |
| ---------- | -------------------------------------------------- | -------------------------------------------------------------- |
| `key`      | `string`                                           | Identifiant unique de la colonne (**requis**)                  |
| `header`   | `ReactNode`                                        | Contenu de l'en-tête (**requis**)                              |
| `accessor` | `keyof T \| ((row: T, index: number) => ReactNode)` | Clé de la propriété **ou** fonction de rendu (**requis**)      |
| `width`    | `string`                                           | Largeur CSS (`"1fr"`, `"120px"`, `"20%"`) — défaut : `"1fr"` |
| `align`    | `"left" \| "center" \| "right"`                   | Alignement du contenu — défaut : `"left"`                     |

### Exemples

#### Tableau simple

```tsx
<Table<User>
  columns={columns}
  data={data}
  striped
  getRowKey={(row) => row.id}
/>
```

#### Avec légende et bordures

```tsx
<Table<User>
  columns={columns}
  data={data}
  bordered
  caption="Liste des utilisateurs"
  size="sm"
  getRowKey={(row) => row.id}
/>
```

#### Rendu personnalisé dans une colonne

```tsx
const columns: TableColumn<User>[] = [
  { key: "name", header: "Nom", accessor: "name" },
  {
    key: "status",
    header: "Statut",
    accessor: (row) => (
      <Badge variant={row.active ? "success" : "default"}>
        {row.active ? "Actif" : "Inactif"}
      </Badge>
    ),
    width: "100px",
    align: "center",
  },
];
```

#### Tableau vide

```tsx
<Table
  columns={columns}
  data={[]}
  emptyLabel="Aucun résultat pour cette recherche."
/>
```

### Affichage progressif (infinite scroll)

Par défaut (`pageSize={20}`), le tableau rend les 20 premières lignes puis affiche un **sentinel** de chargement en bas. Dès que le sentinel devient visible dans le viewport (via `IntersectionObserver`), 20 lignes supplémentaires sont rendues — et ainsi de suite jusqu'à épuisement des données.

Le sentinel disparaît automatiquement quand toutes les lignes sont affichées.

```tsx
// Affichage progressif dans un conteneur scrollable
<div style={{ height: "400px", overflow: "auto" }}>
  <Table<User>
    columns={columns}
    data={largeDataset}   // ex: 1 000 entrées
    pageSize={25}
    loadingLabel="Chargement des lignes suivantes…"
    getRowKey={(row) => row.id}
  />
</div>

// Désactiver l'affichage progressif (tout afficher d'un coup)
<Table columns={columns} data={data} pageSize={0} />
```
