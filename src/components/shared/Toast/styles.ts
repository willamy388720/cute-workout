import styled from "styled-components";

import * as Toast from "@radix-ui/react-toast";

export const ToastViewport = styled(Toast.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
  gap: 10px;
  width: 444px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 10000;
  outline: none;
`;

type Props = {
  variant: "error" | "default";
};

export const ToastRoot = styled(Toast.Root)<Props>`
  background-color: ${({ variant }) =>
    variant === "error" ? "var(--red-2)" : "var(--accent-3)"};
  border-radius: var(--radius-4);
  border: 1px solid
    ${({ variant }) =>
      variant === "error" ? "var(--red-a6)" : "var(--accent-a6)"};
  padding: 15px;

  &[data-state="open"] {
    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state="closed"] {
    animation: hide 100ms ease-in;
  }

  &[data-swipe="move"] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }

  &[data-swipe="cancel"] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }

  &[data-swipe="end"] {
    animation: swipeOut 100ms ease-out;
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(calc(100% + var(--viewport-padding)));
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes swipeOut {
    from {
      transform: translateX(var(--radix-toast-swipe-end-x));
    }
    to {
      transform: translateX(calc(100% + var(--viewport-padding)));
    }
  }
`;

export const ToastTitle = styled(Toast.Title)``;

export const ToastDescription = styled(Toast.Description)`
  /* color: black; */
`;
