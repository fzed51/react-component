import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Table } from "./Table";
import type { TableColumn } from "./types";

type Row = { id: number; name: string };

const columns: TableColumn<Row>[] = [
  { key: "id", header: "ID", accessor: "id" },
  { key: "name", header: "Nom", accessor: "name" },
];

const makeData = (n: number): Row[] =>
  Array.from({ length: n }, (_, i) => ({ id: i + 1, name: `Ligne ${i + 1}` }));

/** Compte les lignes de données (exclut la ligne d'en-tête). */
const dataRowCount = () => screen.getAllByRole("row").length - 1;

describe("Table", () => {
  // IntersectionObserver contrôlable : on capture le callback pour simuler le scroll.
  let triggerIntersect: (() => void) | null = null;

  beforeEach(() => {
    triggerIntersect = null;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(private cb: IntersectionObserverCallback) {
          triggerIntersect = () =>
            this.cb(
              [{ isIntersecting: true } as IntersectionObserverEntry],
              this as unknown as IntersectionObserver,
            );
        }
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return [];
        }
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rend les en-têtes et les données", () => {
    render(<Table columns={columns} data={makeData(3)} />);
    expect(screen.getByText("Nom")).toBeInTheDocument();
    expect(screen.getByText("Ligne 1")).toBeInTheDocument();
    expect(dataRowCount()).toBe(3);
  });

  it("affiche le libellé vide quand il n'y a aucune donnée", () => {
    render(<Table columns={columns} data={[]} emptyLabel="Rien à afficher" />);
    expect(screen.getByText("Rien à afficher")).toBeInTheDocument();
  });

  it("limite l'affichage initial à pageSize", () => {
    render(<Table columns={columns} data={makeData(25)} pageSize={10} />);
    expect(dataRowCount()).toBe(10);
  });

  it("charge la page suivante quand le sentinel devient visible", () => {
    render(<Table columns={columns} data={makeData(25)} pageSize={10} />);
    expect(dataRowCount()).toBe(10);

    act(() => {
      triggerIntersect?.();
    });
    expect(dataRowCount()).toBe(20);

    act(() => {
      triggerIntersect?.();
    });
    expect(dataRowCount()).toBe(25);
  });

  it("affiche tout d'un coup quand pageSize <= 0", () => {
    render(<Table columns={columns} data={makeData(30)} pageSize={0} />);
    expect(dataRowCount()).toBe(30);
  });
});
