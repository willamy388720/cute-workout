import { Children } from "react";
import { ContainerButtonBetween } from "./styles";
import { Loading } from "../Loading";
import { Flex } from "@styles/layout";
import { ButtonProps } from "src/@types/button";

export function ButtonBetween({
  children,
  disabled = false,
  loading,
  size = "1",
  variant = "primary",
  ...rest
}: ButtonProps) {
  const childrens = Children.toArray(children);

  return (
    <ContainerButtonBetween
      {...rest}
      size={size}
      variant={variant}
      disabled={disabled}
    >
      {!loading && childrens[0] && childrens[0]}
      {!loading && childrens[1] && childrens[1]}
      {loading && (
        <Flex style={{ width: "100%" }} align="center" justify="center">
          <Loading />
        </Flex>
      )}
    </ContainerButtonBetween>
  );
}
