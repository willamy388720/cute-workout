import { VariantType } from "src/@types/button";

function getBackgroundColorButton(variant: VariantType) {
  switch (variant) {
    case "primary":
      return "var(--brand-900)";
    case "secondary":
      return "transparent";
    case "link":
      return "transparent";
    default:
      return "var(--brand-900)";
  }
}

function getHoverBackgroundColorButton(variant: VariantType) {
  switch (variant) {
    case "primary":
      return "var(--brand-1200)";
    case "secondary":
      return "transparent";
    case "link":
      return "var(--gray-50)";
    default:
      return "var(--brand-1200)";
  }
}

function getFontColorButton(variant: VariantType) {
  switch (variant) {
    case "primary":
      return "var(--white)";
    case "secondary":
      return "var(--gray-700)";
  }
}

export {
  getBackgroundColorButton,
  getFontColorButton,
  getHoverBackgroundColorButton,
};
