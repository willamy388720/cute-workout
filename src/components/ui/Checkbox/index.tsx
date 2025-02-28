import { InputHTMLAttributes } from "react";
import {
  CheckboxInput,
  CheckboxLabel,
  CheckboxWrapper,
  InlineSvg,
} from "./styles";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  onChangeValue?: () => void;
};

export function Checkbox({ onChangeValue = () => {}, ...rest }: CheckboxProps) {
  return (
    <CheckboxWrapper>
      <CheckboxInput {...rest} className="inp-cbx" type="checkbox" />
      <CheckboxLabel className="cbx" onClick={onChangeValue}>
        <span>
          <svg width="12px" height="10px">
            <use xlinkHref="#check-4" />
          </svg>
        </span>
      </CheckboxLabel>

      <InlineSvg className="inline-svg">
        <symbol id="check-4" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </symbol>
      </InlineSvg>
    </CheckboxWrapper>
  );
}
