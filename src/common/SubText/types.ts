import type { HTMLAttributes, ReactNode } from "react";

export type SubTextVariant = "default" | "muted" | "error" | "success" | "warning";

export interface SubTextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: SubTextVariant;
}
