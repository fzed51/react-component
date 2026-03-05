import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Divider,
  FormGroup,
  InputGroup,
  InputText,
  Label,
  Paper,
  SubCard,
  SubText,
  Text,
  Titre1,
  Titre2,
  Titre3,
} from "../common";
import { InputTextField, SelectorField, TextareaField } from "../common/input";

export function DesignSystem() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div className="min-h-screen bg-app py-10">
      <Paper className="d-flex flex-col gap-6 py-6">
        {/* En-tête */}
        <div>
          <Titre1>Design System</Titre1>
          <SubText>Micro-framework CSS / React — composants de base</SubText>
        </div>

        <Divider />

        {/* Typographie */}
        <Card>
          <Titre2 className="mb-4">Typographie</Titre2>

          <div className="d-flex flex-col gap-3">
            <Titre1>Titre 1 — h1</Titre1>
            <Titre2>Titre 2 — h2</Titre2>
            <Titre3>Titre 3 — h3</Titre3>
            <Text>Texte courant (primary) — Lorem ipsum dolor sit amet.</Text>
            <Text variant="secondary">
              Texte secondaire — Ut enim ad minim veniam.
            </Text>
            <Text variant="tertiary" size="sm">
              Texte tertiaire small — Duis aute irure dolor.
            </Text>
            <SubText>
              Sous-texte / légende — utilisé pour complémenter un titre ou un
              champ.
            </SubText>
            <SubText variant="error">Sous-texte d'erreur</SubText>
            <SubText variant="success">Sous-texte de succès</SubText>
          </div>
        </Card>

        {/* Badges */}
        <Card>
          <Titre2 className="mb-4">Badges</Titre2>
          <div className="d-flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge size="sm" variant="primary">
              Small
            </Badge>
          </div>
        </Card>

        {/* Cadres */}
        <Card>
          <Titre2 className="mb-4">Cadres</Titre2>
          <div className="d-flex flex-col gap-3">
            <SubCard>
              <Text size="sm">SubCard — default (fond subtle)</Text>
            </SubCard>
            <SubCard variant="subtle">
              <Text size="sm">SubCard — subtle (fond muted)</Text>
            </SubCard>
            <SubCard variant="muted">
              <Text size="sm">SubCard — muted (fond app)</Text>
            </SubCard>
          </div>
        </Card>

        {/* Séparateurs */}
        <Card>
          <Titre2 className="mb-4">Séparateurs</Titre2>
          <Divider />
          <Text size="sm" className="my-3">
            Divider simple
          </Text>
          <Divider label="ou" />
          <Text size="sm" className="mt-3">
            Divider avec label
          </Text>
        </Card>

        {/* Formulaires */}
        <Card>
          <Titre2 className="mb-4">Formulaire</Titre2>
          <div className="d-flex flex-col gap-4">
            <InputTextField
              id="name"
              label="Nom complet"
              placeholder="Jean Dupont"
              required
              hint="Votre prénom et nom de famille."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <SelectorField
              id="country"
              label="Pays"
              required
              placeholder="Choisir un pays"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              state={!country ? "error" : "success"}
              error={!country ? "Veuillez sélectionner un pays." : undefined}
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

            <FormGroup>
              <Label htmlFor="search">Recherche</Label>
              <InputGroup prefix="🔍">
                <InputText id="search" placeholder="Rechercher…" />
              </InputGroup>
            </FormGroup>

            <InputTextField
              id="disabled"
              label="Champ désactivé"
              placeholder="Non modifiable"
              disabled
            />
          </div>
        </Card>

        {/* Boutons */}
        <Card>
          <Titre2 className="mb-4">Boutons</Titre2>

          <div className="d-flex flex-col gap-4">
            <div className="d-flex flex-wrap gap-2 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>

            <Divider label="Tailles" />

            <div className="d-flex flex-wrap gap-2 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>

            <Divider label="États" />

            <div className="d-flex flex-wrap gap-2 items-center">
              <Button loading>Chargement…</Button>
              <Button disabled>Désactivé</Button>
              <Button variant="primary" fullWidth>
                Pleine largeur
              </Button>
            </div>
          </div>
        </Card>
      </Paper>
    </div>
  );
}
