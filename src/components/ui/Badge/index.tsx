import { ContainerBadge } from "./styles";

type ColorsBadge = "accent" | "warning" | "gray" | "error" | "success";

type BadgeProps = {
  label: string;
  color: ColorsBadge;
};

export function Badge({ label, color }: BadgeProps) {
  function getColor(color: ColorsBadge): string {
    switch (color) {
      case "accent":
        return "var(--brand-900)";
      case "warning":
        return "var(--warning-500)";
      case "gray":
        return "var(--gray-800)";
      case "error":
        return "var(--danger-500)";
      case "success":
        return "var(--success-500)";
      default:
        return "var(--brand-900)";
    }
  }
  return (
    <ContainerBadge className="badge" color={getColor(color)}>
      <span>{label.toUpperCase()}</span>
    </ContainerBadge>
  );
}
