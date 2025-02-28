import styled, { css, keyframes } from "styled-components";
import { Flex } from "@styles/layout";

// Animação de fade in vindo de cima
export const fadeInTop = keyframes`
  from {
    display: none;
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    display: flex;
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animação de fade out descendo para baixo
export const fadeOutBottom = keyframes`
  from {
    display: flex;
    opacity: 1;
    transform: translateY(0);
  }
  to {
    display: none;
    opacity: 0;
    transform: translateY(-20px);
  }
`;

type ContainerToastProps = {
  color: string;
  isOpen: boolean;
};

export const ContainerToast = styled(Flex)<ContainerToastProps>`
  position: fixed;
  background-color: ${({ color }) => color};
  z-index: 999999999999999999999999999;
  top: 0;
  left: 0;
  width: 100dvw;
  padding: 1.6rem;
  align-items: center;
  ${({ isOpen }) =>
    isOpen
      ? css`
          display: flex;
          animation: ${fadeInTop} 0.3s ease-out forwards;
        `
      : css`
          display: none;
          animation: ${fadeOutBottom} 0.3s ease-out forwards;
        `}
`;

export const ContentToast = styled(Flex)`
  max-width: 128rem;
  width: 100%;
`;
