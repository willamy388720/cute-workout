import { ToggleWrapper } from "./styles";

type ToggleButtonProps = {
  isChecked: boolean;
  onToggle: () => void;
};

export function ToggleButton({ isChecked, onToggle }: ToggleButtonProps) {
  return (
    <ToggleWrapper checked={isChecked}>
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={onToggle} />
        <div className="slider"></div>
      </label>
    </ToggleWrapper>
  );
}
