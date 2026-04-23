import type { ReactNode } from "react";
import clsx from "clsx";
import "./Table.css";
import type { TableColumn, TableProps } from "./types";

function getCellValue<T>(
  row: T,
  accessor: TableColumn<T>["accessor"],
  index: number,
): ReactNode {
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
  className = "",
  getRowKey,
  ...props
}: TableProps<T>) {
  const gridTemplateColumns = columns.map((col) => col.width ?? "1fr").join(" ");

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
            data.map((row, rowIndex) => (
              <div
                key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}
                className="table__row"
                role="row"
              >
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={clsx(
                      "table__cell",
                      col.align && `table__cell--${col.align}`,
                    )}
                    role="cell"
                  >
                    {getCellValue(row, col.accessor, rowIndex)}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
