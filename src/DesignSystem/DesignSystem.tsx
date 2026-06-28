import { useState } from "react";
import type { TableColumn } from "../common";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  FormGroup,
  InputGroup,
  InputText,
  Label,
  RadioGroup,
  SubCard,
  SubText,
  Table,
  Text,
  Titre1,
  Titre2,
  Titre3,
} from "../common";
import {
  CheckboxField,
  InputTextField,
  PasswordField,
  RadioGroupField,
  SelectorField,
  TextareaField,
} from "../common/input";
import { Demo } from "./Demo";

export function DesignSystem() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [cgu, setCgu] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [plan, setPlan] = useState("pro");

  const planOptions = [
    { value: "free", label: "Gratuit" },
    { value: "pro", label: "Pro" },
    { value: "enterprise", label: "Entreprise" },
  ];

  type Member = { name: string; role: string; status: "active" | "inactive" };

  const members: Member[] = [
    { name: "Alice Martin", role: "Admin", status: "active" },
    { name: "Bob Dupont", role: "Éditeur", status: "active" },
    { name: "Claire Leroy", role: "Lecteur", status: "inactive" },
    { name: "David Moreau", role: "Éditeur", status: "active" },
  ];

  const membersColumns: TableColumn<Member>[] = [
    { key: "name", header: "Nom", accessor: "name" },
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

  type Invoice = { id: string; client: string; amount: number; date: string };

  const invoices: Invoice[] = [
    { id: "INV-001", client: "Acme Corp", amount: 1200, date: "2026-03-01" },
    { id: "INV-002", client: "Globex", amount: 850, date: "2026-03-15" },
    { id: "INV-003", client: "Initech", amount: 3400, date: "2026-04-01" },
    { id: "INV-004", client: "Umbrella", amount: 670, date: "2026-04-10" },
    { id: "INV-005", client: "Stark Ind.", amount: 9800, date: "2026-04-20" },
  ];

  const invoicesColumns: TableColumn<Invoice>[] = [
    { key: "id", header: "N°", accessor: "id", width: "100px" },
    { key: "client", header: "Client", accessor: "client" },
    {
      key: "amount",
      header: "Montant",
      accessor: (row) => `${row.amount.toLocaleString("fr-FR")} €`,
      width: "120px",
      align: "right",
    },
    { key: "date", header: "Date", accessor: "date", width: "120px", align: "center" },
  ];

  return (
    <>
      {/* Typographie */}
      <Card>
        <Titre2 className="mb-4">Typographie</Titre2>

        <Demo
          code={`<Titre1>Titre 1 — h1</Titre1>
<Titre2>Titre 2 — h2</Titre2>
<Titre3>Titre 3 — h3</Titre3>
<Text>Texte courant (primary) — Lorem ipsum dolor sit amet.</Text>
<Text variant="secondary">Texte secondaire — Ut enim ad minim veniam.</Text>
<Text variant="tertiary" size="sm">Texte tertiaire small — Duis aute irure dolor.</Text>
<SubText>Sous-texte / légende — utilisé pour complémenter un titre ou un champ.</SubText>
<SubText variant="error">Sous-texte d'erreur</SubText>
<SubText variant="success">Sous-texte de succès</SubText>`}
        >
          <div className="d-flex flex-col gap-3">
            <Titre1>Titre 1 — h1</Titre1>
            <Titre2>Titre 2 — h2</Titre2>
            <Titre3>Titre 3 — h3</Titre3>
            <Text>Texte courant (primary) — Lorem ipsum dolor sit amet.</Text>
            <Text variant="secondary">Texte secondaire — Ut enim ad minim veniam.</Text>
            <Text variant="tertiary" size="sm">
              Texte tertiaire small — Duis aute irure dolor.
            </Text>
            <SubText>
              Sous-texte / légende — utilisé pour complémenter un titre ou un champ.
            </SubText>
            <SubText variant="error">Sous-texte d'erreur</SubText>
            <SubText variant="success">Sous-texte de succès</SubText>
          </div>
        </Demo>
      </Card>

      {/* Badges */}
      <Card>
        <Titre2 className="mb-4">Badges</Titre2>
        <Demo
          code={`<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge size="sm" variant="primary">Small</Badge>`}
        >
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
        </Demo>
      </Card>

      {/* Cadres */}
      <Card>
        <Titre2 className="mb-4">Cadres</Titre2>
        <Demo
          code={`<SubCard>
  <Text size="sm">SubCard — default (fond subtle)</Text>
</SubCard>
<SubCard variant="subtle">
  <Text size="sm">SubCard — subtle (fond muted)</Text>
</SubCard>
<SubCard variant="muted">
  <Text size="sm">SubCard — muted (fond app)</Text>
</SubCard>`}
        >
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
        </Demo>
      </Card>

      {/* Séparateurs */}
      <Card>
        <Titre2 className="mb-4">Séparateurs</Titre2>
        <Demo
          code={`<Divider />
<Divider label="ou" />`}
        >
          <Divider />
          <Text size="sm" className="my-3">
            Divider simple
          </Text>
          <Divider label="ou" />
          <Text size="sm" className="mt-3">
            Divider avec label
          </Text>
        </Demo>
      </Card>

      {/* Formulaires */}
      <Card>
        <Titre2 className="mb-4">Formulaire</Titre2>
        <Demo
          code={`<InputTextField
  id="name"
  label="Nom complet"
  placeholder="Jean Dupont"
  required
  hint="Votre prénom et nom de famille."
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<PasswordField
  id="password"
  label="Mot de passe"
  autoComplete="current-password"
  required
  hint="8 caractères minimum."
  value={password}
  onChange={(e) => setPassword(e.target.value)}
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

<CheckboxField
  id="cgu"
  label="J'accepte les conditions générales"
  required
  checked={cgu}
  onChange={(e) => setCgu(e.target.checked)}
  error={!cgu ? "Vous devez accepter les conditions." : undefined}
/>

<CheckboxField
  id="notif"
  variant="switch"
  label="Recevoir les notifications par e-mail"
  hint="Vous pourrez le modifier plus tard."
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
/>

<InputTextField id="disabled" label="Champ désactivé" placeholder="Non modifiable" disabled />`}
        >
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

            <PasswordField
              id="password"
              label="Mot de passe"
              autoComplete="current-password"
              required
              hint="8 caractères minimum."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            <CheckboxField
              id="cgu"
              label="J'accepte les conditions générales"
              required
              checked={cgu}
              onChange={(e) => setCgu(e.target.checked)}
              error={!cgu ? "Vous devez accepter les conditions." : undefined}
            />

            <CheckboxField
              id="notif"
              variant="switch"
              label="Recevoir les notifications par e-mail"
              hint="Vous pourrez le modifier plus tard."
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />

            <InputTextField
              id="disabled"
              label="Champ désactivé"
              placeholder="Non modifiable"
              disabled
            />
          </div>
        </Demo>
      </Card>

      {/* Cases à cocher & interrupteurs */}
      <Card>
        <Titre2 className="mb-4">Cases à cocher & interrupteurs</Titre2>

        <Demo
          code={`{/* Deux formes */}
<Checkbox label="Case à cocher" defaultChecked />
<Checkbox variant="switch" label="Interrupteur" defaultChecked />

{/* Tailles (sm | md | lg) — idem avec variant="switch" */}
<Checkbox size="sm" label="Small" defaultChecked />
<Checkbox size="md" label="Medium" defaultChecked />
<Checkbox size="lg" label="Large" defaultChecked />

{/* États — idem avec variant="switch" */}
<Checkbox label="Erreur" state="error" />
<Checkbox label="Erreur cochée" state="error" defaultChecked />
<Checkbox label="Succès cochée" state="success" defaultChecked />
<Checkbox label="Désactivé" disabled />
<Checkbox label="Désactivé coché" disabled defaultChecked />`}
        >
          <div className="d-flex flex-col gap-4">
            <div className="d-flex flex-wrap gap-6 items-center">
              <Checkbox label="Case à cocher" defaultChecked />
              <Checkbox variant="switch" label="Interrupteur" defaultChecked />
            </div>

            <Divider label="Tailles" />

            <div className="d-flex flex-wrap gap-6 items-center">
              <Checkbox size="sm" label="Small" defaultChecked />
              <Checkbox size="md" label="Medium" defaultChecked />
              <Checkbox size="lg" label="Large" defaultChecked />
            </div>
            <div className="d-flex flex-wrap gap-6 items-center">
              <Checkbox variant="switch" size="sm" label="Small" defaultChecked />
              <Checkbox variant="switch" size="md" label="Medium" defaultChecked />
              <Checkbox variant="switch" size="lg" label="Large" defaultChecked />
            </div>

            <Divider label="États" />

            <div className="d-flex flex-wrap gap-6 items-center">
              <Checkbox label="Erreur" state="error" />
              <Checkbox label="Erreur cochée" state="error" defaultChecked />
              <Checkbox label="Succès cochée" state="success" defaultChecked />
              <Checkbox label="Désactivé" disabled />
              <Checkbox label="Désactivé coché" disabled defaultChecked />
            </div>
            <div className="d-flex flex-wrap gap-6 items-center">
              <Checkbox variant="switch" label="Erreur" state="error" />
              <Checkbox variant="switch" label="Erreur cochée" state="error" defaultChecked />
              <Checkbox variant="switch" label="Succès cochée" state="success" defaultChecked />
              <Checkbox variant="switch" label="Désactivé" disabled />
              <Checkbox variant="switch" label="Désactivé coché" disabled defaultChecked />
            </div>
          </div>
        </Demo>
      </Card>

      {/* Boutons radio */}
      <Card>
        <Titre2 className="mb-4">Boutons radio</Titre2>

        <Demo
          code={`const planOptions = [
  { value: "free", label: "Gratuit" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Entreprise" },
];

{/* Dispositions (stack | inline | grid) */}
<RadioGroup name="plan-stack" options={planOptions} defaultValue="pro" />
<RadioGroup name="plan-inline" layout="inline" options={planOptions} defaultValue="pro" />
<RadioGroup name="plan-grid" layout="grid" columns={3} options={planOptions} defaultValue="pro" />

{/* Tailles (sm | md | lg) */}
<RadioGroup name="plan-sm" layout="inline" size="sm" options={planOptions} defaultValue="pro" />
<RadioGroup name="plan-lg" layout="inline" size="lg" options={planOptions} defaultValue="pro" />

{/* Contrôlé + champ composé avec erreur */}
const [plan, setPlan] = useState("pro");
<RadioGroup name="plan-ctrl" layout="inline" options={planOptions} value={plan} onChange={setPlan} />

<RadioGroupField
  id="plan-field"
  label="Formule"
  required
  layout="inline"
  options={planOptions}
  error="Veuillez choisir une formule"
/>`}
        >
          <div className="d-flex flex-col gap-4">
            <Divider label="Dispositions" />
            <div className="d-flex flex-col gap-2">
              <SubText>stack (défaut)</SubText>
              <RadioGroup name="plan-stack" options={planOptions} defaultValue="pro" />
            </div>
            <div className="d-flex flex-col gap-2">
              <SubText>inline</SubText>
              <RadioGroup
                name="plan-inline"
                layout="inline"
                options={planOptions}
                defaultValue="pro"
              />
            </div>
            <div className="d-flex flex-col gap-2">
              <SubText>grid (columns=3)</SubText>
              <RadioGroup
                name="plan-grid"
                layout="grid"
                columns={3}
                options={planOptions}
                defaultValue="pro"
              />
            </div>

            <Divider label="Tailles" />
            <RadioGroup
              name="plan-sm"
              layout="inline"
              size="sm"
              options={planOptions}
              defaultValue="pro"
            />
            <RadioGroup
              name="plan-lg"
              layout="inline"
              size="lg"
              options={planOptions}
              defaultValue="pro"
            />

            <Divider label="Contrôlé & champ composé" />
            <div className="d-flex flex-col gap-2">
              <RadioGroup
                name="plan-ctrl"
                layout="inline"
                options={planOptions}
                value={plan}
                onChange={setPlan}
              />
              <SubText>Sélection : {plan}</SubText>
            </div>
            <RadioGroupField
              id="plan-field"
              label="Formule"
              required
              layout="inline"
              options={planOptions}
              error="Veuillez choisir une formule"
            />
          </div>
        </Demo>
      </Card>

      {/* Table */}
      <Card>
        <Titre2 className="mb-4">Tableaux</Titre2>
        <Demo
          code={`const columns: TableColumn<Member>[] = [
  { key: "name", header: "Nom", accessor: "name" },
  { key: "role", header: "Rôle", accessor: "role", width: "120px" },
  {
    key: "status",
    header: "Statut",
    accessor: (row) => <Badge>{row.status}</Badge>,
    align: "center",
  },
];

<Table<Member>
  columns={columns}
  data={members}
  striped
  getRowKey={(row) => row.name}
/>

<Table<Invoice>
  columns={invoicesColumns}
  data={invoices}
  bordered
  caption="Dernières factures"
  getRowKey={(row) => row.id}
/>`}
        >
          <div className="d-flex flex-col gap-6">
            <div>
              <Titre3 className="mb-2">Simple (striped)</Titre3>
              <Table<Member>
                columns={membersColumns}
                data={members}
                striped
                getRowKey={(row) => row.name}
              />
            </div>
            <div>
              <Titre3 className="mb-2">Avec légende et bordures</Titre3>
              <Table<Invoice>
                columns={invoicesColumns}
                data={invoices}
                bordered
                caption="Dernières factures"
                getRowKey={(row) => row.id}
              />
            </div>
          </div>
        </Demo>
      </Card>

      {/* Boutons */}
      <Card>
        <Titre2 className="mb-4">Boutons</Titre2>

        <Demo
          code={`{/* Variantes */}
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

{/* Tailles */}
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

{/* États */}
<Button loading>Chargement…</Button>
<Button disabled>Désactivé</Button>
<Button variant="primary" fullWidth>Pleine largeur</Button>`}
        >
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
        </Demo>
      </Card>
    </>
  );
}
