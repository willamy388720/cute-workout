import { ButtonHTMLAttributes } from "react";
import { ContainerButtonSocialLogin } from "./styles";
import { Loading } from "../Loading";
import { Flex } from "@styles/layout";

import google from "@assets/Google.svg";
import facebook from "@assets/Facebook.svg";
import apple from "@assets/Apple.svg";

type VariantsLoginSocial = "google" | "facebook" | "apple";

const socialData = {
  google: {
    color: "var(--white)",
    title: "Cadastre-se com Google",
    image: google,
  },
  facebook: {
    color: "#0866FF",
    title: "Cadastre-se com Facebook",
    image: facebook,
  },
  apple: { color: "#000000", title: "Cadastre-se com Facebook", image: apple },
};

const defaultSocialData = {
  color: "#FFCECE",
  title: "Pizzas",
  image: google,
};

type ButtonSocialLoginProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: VariantsLoginSocial;
  disabled?: boolean;
  loading?: boolean;
};

export function ButtonSocialLogin({
  disabled = false,
  loading,
  variant,
  ...rest
}: ButtonSocialLoginProps) {
  const { color, title, image } =
    socialData[variant as VariantsLoginSocial] || defaultSocialData;

  return (
    <ContainerButtonSocialLogin
      {...rest}
      variant={variant}
      disabled={disabled}
      color={color}
    >
      {!loading && (
        <Flex
          direction="row"
          style={{ gap: 6 }}
          align="center"
          justify="center"
        >
          <img src={image} alt="" />
          {title}
        </Flex>
      )}

      {loading && (
        <Flex style={{ width: "100%" }} align="center" justify="center">
          <Loading />
        </Flex>
      )}
    </ContainerButtonSocialLogin>
  );
}
