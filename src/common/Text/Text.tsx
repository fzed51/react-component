import clsx from "clsx";
import "./Text.css";
import type { TextProps, TextSize, TextVariant } from "./types";

const variantClass: Record<TextVariant, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  inverse: "text-inverse",
  error: "text-error",
  success: "text-success",
  warning: "text-warning",
};

const sizeClass: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

/**
 * Paragraphe / texte courant du design system.
 */
export function Text({
  children,
  variant = "primary",
  size = "md",
  box = false,
  inline = false,
  className = "",
  ...props
}: TextProps) {
  if ("as" in props) {
    throw new Error('The "as" prop is not allowed. Use "box" or "inline" instead.');
  }

  const Tag = box ? "div" : inline ? "span" : "p";
  const classes = clsx("text-component", variantClass[variant], sizeClass[size], className);

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
