import clsx from "clsx";
import { type ReactNode, useCallback, useLayoutEffect, useRef, useState } from "react";
import "./Table.css";
import type { TableColumn, TableProps } from "./types";

function getCellValue<T>(row: T, accessor: TableColumn<T>["accessor"], index: number): ReactNode {
  if (typeof accessor === "function") {
    return accessor(row, index);
  }
  const value = (row as Record<string, unknown>)[accessor as string];
  if (value == null) return null;
  return String(value);
}

export function Table<T = Record<string, unknown>>({
  columns,
  data,
  striped = false,
  bordered = false,
  size = "md",
  caption,
  emptyLabel = "Aucune donnée",
  loadingLabel = "Chargement…",
  pageSize = 20,
  className = "",
  getRowKey,
  ...props
}: TableProps<T>) {
  const gridTemplateColumns = columns.map((col) => col.width ?? "1fr").join(" ");

  const effectivePageSize = pageSize <= 0 ? data.length : pageSize;

  const [visibleCount, setVisibleCount] = useState(() => Math.min(effectivePageSize, data.length));
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Réinitialise le compteur quand les données ou le pageSize changent
  useLayoutEffect(() => {
    setVisibleCount(Math.min(effectivePageSize, data.length));
  }, [data, effectivePageSize]);

  // Callback ref sur le sentinel : branche / débranche l'observer à chaque montage/démontage
  const sentinelRef = useCallback(
    (el: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleCount((c) => Math.min(c + effectivePageSize, data.length));
          }
        },
        { threshold: 0 },
      );

      observer.observe(el);
      observerRef.current = observer;
    },
    // data.length : recréer le callback quand la taille change afin d'avoir la bonne valeur dans la closure
    [data.length, effectivePageSize],
  );

  const visibleRows = data.slice(0, visibleCount);
  const hasMore = visibleCount < data.length;

  return (
    <div className={clsx("table-wrapper", className)} {...props}>
      {caption && <div className="table__caption">{caption}</div>}

      <div
        className={clsx(
          "table",
          `table--${size}`,
          striped && "table--striped",
          bordered && "table--bordered",
        )}
        style={{ gridTemplateColumns }}
        role="table"
        aria-label={caption}
      >
        <div className="table__head" role="rowgroup">
          <div className="table__row" role="row">
            {columns.map((col) => (
              <div
                key={col.key}
                className={clsx(
                  "table__header-cell",
                  col.align && `table__header-cell--${col.align}`,
                )}
                role="columnheader"
              >
                {col.header}
              </div>
            ))}
          </div>
        </div>

        <div className="table__body" role="rowgroup">
          {data.length === 0 ? (
            <div className="table__empty" role="row">
              <span role="cell">{emptyLabel}</span>
            </div>
          ) : (
            <>
              {visibleRows.map((row, rowIndex) => (
                <div
                  key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}
                  className="table__row"
                  role="row"
                >
                  {columns.map((col) => (
                    <div
                      key={col.key}
                      className={clsx("table__cell", col.align && `table__cell--${col.align}`)}
                      role="cell"
                    >
                      {getCellValue(row, col.accessor, rowIndex)}
                    </div>
                  ))}
                </div>
              ))}

              {hasMore && (
                <div
                  ref={sentinelRef}
                  className="table__sentinel"
                  aria-label={`${loadingLabel} ${visibleCount} / ${data.length}`}
                  aria-busy="true"
                >
                  <span className="table__sentinel-spinner" aria-hidden="true" />
                  {loadingLabel}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
