import styled from "styled-components";
import { Flex } from "@styles/layout";

export const ContainerShoppingCart = styled(Flex)`
  max-width: 36rem;
  width: 100%;
  background-color: var(--white);
  border-radius: 1.2rem;
  box-shadow: var(--shadow-bottom-3);

  @media (max-width: 840px) {
    display: none;
  }
`;

export const HeaderShoppingCart = styled(Flex)`
  margin-bottom: 8px;
  padding: 1.2rem;

  border-bottom: 1px solid #e0e0e080;
`;

export const ContentShoppingCart = styled(Flex)`
  padding: 1.2rem;
  gap: 1.2rem;
`;

export const ValuesShoppingCart = styled(Flex)`
  padding: 1.2rem;
  border-top: 1px solid #e0e0e080;
  gap: 0.4rem;
`;

export const FooterShoppingCart = styled(Flex)`
  padding: 1.2rem;
  border-top: 1px solid #e0e0e080;
`;

export const ContainerShoppingCartMobile = styled(Flex)`
  display: none;
  background-color: var(--white);
  border-top-left-radius: 1.6rem;
  border-top-right-radius: 1.6rem;
  box-shadow: var(--shadow-top-4);
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1.6rem;
  z-index: 999;
  width: 100%;
  height: 7.8rem;

  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  @media (max-width: 840px) {
    display: flex;
  }
`;

export const Account = styled(Flex)`
  width: 2rem;
  height: 2rem;
  background-color: var(--brand-900);
  align-items: center;
  justify-content: center;
  border-radius: 99999px;
  position: absolute;
  right: -6px;
  top: -6px;
`;
