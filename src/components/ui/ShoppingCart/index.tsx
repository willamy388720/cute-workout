import { useState } from "react";
import { Flex } from "@styles/layout";
import {
  Account,
  ContainerShoppingCart,
  ContainerShoppingCartMobile,
  ContentShoppingCart,
  FooterShoppingCart,
  HeaderShoppingCart,
  ValuesShoppingCart,
} from "./styles";
import { Button } from "../Button";
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconLock,
  IconShoppingCartFilled,
  IconX,
} from "@tabler/icons-react";

import cart from "@assets/cart.svg";
import { Heading, Label, Link, Text } from "@styles/typography";
import { Modal } from "../Modal";
import { IdentifyYourself } from "@components/IdentifyYourself";
import { useNavigate } from "react-router-dom";
import { useCartLocal } from "@hooks/useCartLocal";
import { CardItem } from "../Cards/CardItem";
import { useBusinessInformation } from "@hooks/useBusinessInformation";
import { formatPrice } from "@utils/pages/formatPrice";
import { ProductCartDTO } from "@dtos/productCartDTO";
import { useToast } from "@hooks/useToast";
import { useStoreStatus } from "@hooks/useStoreStatus";
import { useCartSummary } from "@hooks/useCartSummary";
import { useUser } from "@hooks/useUser";

type ShoppingCartProps = {
  onEditOrder: (product: ProductCartDTO) => void;
};

export function ShoppingCart({ onEditOrder }: ShoppingCartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { businessInformation } = useBusinessInformation();

  const { cartLocal, actionCartLocalFn } = useCartLocal();

  const { user } = useUser();

  const { showToast } = useToast();

  const { isOpen } = useStoreStatus();

  const navigate = useNavigate();

  const { isCartEmpty, subtotal, total } = useCartSummary();

  async function handleDeleleCart() {
    try {
      await actionCartLocalFn({
        ...({} as ProductCartDTO),
        actionType: "deleteAll",
      });

      showToast({
        icon: IconCircleCheckFilled,
        title: "Carrinho limpo com sucesso!",
        variant: "success",
      });
    } catch (error) {
      showToast({
        icon: IconAlertTriangleFilled,
        title: "Erro ao limpar carrinho. Tente novamente!",
        variant: "dark",
      });
    }
  }

  function handleFinalizeOrder() {
    if (user) {
      navigate(`/finalizar`, { state: { from: "/cardapio" } });
      return;
    }

    setIsModalOpen(true);
  }

  return (
    <>
      <ContainerShoppingCart>
        <Modal.Root
          isOpenModal={isModalOpen}
          onCloseModal={() => setIsModalOpen(false)}
          title="Identificação"
          width={480}
        >
          <IdentifyYourself />
        </Modal.Root>

        {cartLocal?.products && cartLocal.products.length > 0 && (
          <>
            <HeaderShoppingCart
              align="center"
              justify="space-between"
              direction="row"
            >
              <Text size="3" color="var(--gray-800)" weight="bold">
                Meu pedido
              </Text>

              <Link
                weight="bold"
                color="var(--gray-700)"
                onClick={handleDeleleCart}
              >
                <IconX size={16} />
                Limpar
              </Link>
            </HeaderShoppingCart>

            <ContentShoppingCart>
              {cartLocal.products.map((product) => (
                <CardItem
                  key={product.id}
                  product={product}
                  onEditOrder={() => onEditOrder(product)}
                />
              ))}
            </ContentShoppingCart>

            <ValuesShoppingCart>
              <Text size="3" weight="bold">
                Resumo do pedido
              </Text>

              <Flex direction="row" align="center" justify="space-between">
                <Text>Subtotal</Text>
                <Text>R$ {formatPrice(subtotal)}</Text>
              </Flex>

              <Flex direction="row" align="center" justify="space-between">
                <Text color="var(--gray-600)">Entrega</Text>

                {businessInformation &&
                  businessInformation.deliveryFee === 0 && (
                    <Text color="var(--success-500)" weight="bold">
                      Grátis
                    </Text>
                  )}

                {businessInformation &&
                  businessInformation.deliveryFee !== 0 && (
                    <Text color="var(--gray-600)">
                      R$ {formatPrice(businessInformation.deliveryFee)}
                    </Text>
                  )}
              </Flex>

              <Flex direction="row" align="center" justify="space-between">
                <Text size="2" weight="bold">
                  Total
                </Text>

                <Text size="2" weight="bold">
                  R$ {formatPrice(total)}
                </Text>
              </Flex>
            </ValuesShoppingCart>
          </>
        )}

        {isCartEmpty && (
          <ContentShoppingCart>
            <Flex
              gap={4}
              style={{ marginTop: 32, marginBottom: 32 }}
              align="center"
            >
              <img src={cart} alt="" style={{ width: 100 }} />

              <Flex style={{ gap: 2 }} align="center">
                <Text weight="bold">Seu carrinho está vazio</Text>

                <Label color="var(--gray-500)">Adicione itens</Label>
              </Flex>
            </Flex>
          </ContentShoppingCart>
        )}

        <FooterShoppingCart>
          <Button
            size="3"
            disabled={!isOpen || isCartEmpty}
            onClick={handleFinalizeOrder}
          >
            {!isOpen && <IconLock size={24} />}
            {!isOpen ? "Estabelecimento fechado" : "Finalizar pedido"}
          </Button>
        </FooterShoppingCart>
      </ContainerShoppingCart>

      {cartLocal && cartLocal.products?.length > 0 && (
        <ContainerShoppingCartMobile id="container-shopping-cart-mobile">
          <Flex gap={4} align="center" direction="row">
            <Flex style={{ position: "relative" }}>
              <IconShoppingCartFilled size={32} color="var(--gray-900)" />
              {cartLocal?.products && cartLocal.products.length > 0 && (
                <Account>
                  <Text color="var(--white)" weight="bold">
                    {cartLocal?.products.length}
                  </Text>
                </Account>
              )}
            </Flex>

            <Flex>
              <Text color="vat(--gray-600)">Total</Text>

              <Heading>R$ {formatPrice(total)}</Heading>
            </Flex>
          </Flex>

          <Button
            size="2"
            onClick={() => navigate("/carrinho")}
            disabled={
              (cartLocal?.products && cartLocal.products.length === 0) ||
              !isOpen
            }
          >
            Ver carrinho
          </Button>
        </ContainerShoppingCartMobile>
      )}
    </>
  );
}
