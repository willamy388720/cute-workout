import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOutDown = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const modalInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);

  }
`;

const modaOutDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    
    opacity: 0;
    transform: translateY(100%);
  }
`;

type OverlayProps = {
  isClosing: boolean;
};

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(21, 21, 21, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000000;

  animation: ${({ isClosing }) => (isClosing ? fadeOutDown : fadeInUp)} 0.2s
    ease;
`;

type ModalContainerProps = {
  width: number;
  isClosing: boolean;
};

export const ModalContainer = styled.div<ModalContainerProps>`
  position: relative;
  background: var(--white);
  display: flex;
  flex-direction: column;
  border-radius: 1.6rem;

  max-width: ${({ width }) => width}px;
  width: 100%;
  box-shadow: var(--shadow-bottom-5);
  max-height: 61.44rem;
  overflow: hidden;
  z-index: 1000002;

  animation: ${({ isClosing }) => (isClosing ? modaOutDown : modalInUp)} 0.2s
    ease;

  /* Oculta a barra de rolagem */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari e Edge */
  }

  @media (max-width: 840px) {
    max-height: 90dvh;
  }

  @media (max-width: 670px) {
    max-height: 100dvh;
    height: 100dvh;
    max-width: 100dvw;
    border-top-left-radius: 1.6rem;
    border-top-right-radius: 1.6rem;
    margin-top: 2.4rem;
  }
`;

export const ModalHeader = styled.div`
  position: relative;
  background: var(--gray-50);
  padding: 1.6rem;
  border-bottom: 1px solid var(--gray-100);
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

export const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* Melhora o scroll no iOS */
  touch-action: auto; /* Garante que o toque funcione */

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 840px) {
    padding-bottom: 2.4rem;
  }
`;

export const ModalFooter = styled.div`
  position: relative;
  background: var(--white);
  padding: 1.6rem;
  border-top: 1px solid var(--gray-100);

  @media (max-width: 840px) {
    padding-bottom: 2.4rem;
  }
`;
