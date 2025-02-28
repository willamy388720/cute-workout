import { Children, ReactNode, useEffect, useState } from "react";
import {
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Overlay,
} from "./styles";
import { Heading } from "@styles/typography";
import { IconButton } from "../IconButton";
import { IconX } from "@tabler/icons-react";
import { Flex } from "@styles/layout";

type ModalProps = {
  isOpenModal: boolean;
  onCloseModal: () => void;
  title: string;
  width?: number;
  children?: ReactNode;
  imgUrl?: string;
};

function ModalRoot({
  isOpenModal,
  onCloseModal,
  title,
  width = 640,
  children,
  imgUrl,
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const childrens = Children.toArray(children);

  function handleCloseModal() {
    setIsClosing(true);

    setTimeout(() => {
      onCloseModal();
    }, 100);
  }

  useEffect(() => {
    setIsClosing(false);
    const shoppingCart = document.getElementById(
      "container-shopping-cart-mobile"
    );

    if (shoppingCart) {
      if (isOpenModal) {
        shoppingCart.style.bottom = "-7.8rem";
      } else {
        shoppingCart.style.bottom = "0";
      }
    }
  }, [isOpenModal]);

  return (
    <>
      {isOpenModal && (
        <Overlay isClosing={isClosing}>
          <ModalContainer isClosing={isClosing} width={width}>
            <ModalHeader>
              <Flex direction="row" gap={3} align="center">
                {imgUrl && <img src={imgUrl} alt="" />}
                <Heading>{title}</Heading>
              </Flex>

              <IconButton
                onClick={handleCloseModal}
                size="2"
                variant="secondary"
              >
                <IconX size={20} />
              </IconButton>
            </ModalHeader>

            <ModalContent>{childrens[0]}</ModalContent>

            {childrens.length > 1 && <ModalFooter>{childrens[1]}</ModalFooter>}
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
}

type FooterProps = {
  children: ReactNode;
};

function Footer({ children }: FooterProps) {
  return <Flex>{children}</Flex>;
}

export const Modal = {
  Root: ModalRoot,
  Footer: Footer,
};
