import type { HTMLAttributes, ReactNode } from "react";

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
