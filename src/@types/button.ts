import { ButtonHTMLAttributes, ReactNode } from "react";

export type VariantType = "primary" | "secondary" | "link";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  size?: "1" | "2" | "3";
  variant?: VariantType;
  dark?: boolean;
  disabled?: boolean;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  loading?: boolean;
};
