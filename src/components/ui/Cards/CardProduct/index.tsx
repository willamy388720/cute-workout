import { Flex } from "@styles/layout";
import { ContainerCardProduct } from "./styles";
import { Heading, Label, Text } from "@styles/typography";
import { Badge } from "@components/ui/Badge";
import { IconButton } from "@components/ui/IconButton";
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconPlus,
} from "@tabler/icons-react";
import { MouseEvent } from "react";
import { formatPrice } from "@utils/pages/formatPrice";
import { ProductDTO } from "@dtos/productDTO";
import { ProductSizeDTO } from "@dtos/productSizeDTO";
import { useProductSizes } from "@hooks/useProductSizes";
import { useCartLocal } from "@hooks/useCartLocal";
import { useToast } from "@hooks/useToast";
import { v4 as uuidv4 } from "uuid";

type CardProductProps = {
  product: ProductDTO;
  lowestPrice: number;
  onClick?: () => void;
  priceMayVary?: boolean;
  priceOnOffer?: string;
  itsOnOffer?: boolean;
};

export function CardProduct({
  product,
  lowestPrice,
  priceMayVary,
  priceOnOffer,
  itsOnOffer,
  onClick,
}: CardProductProps) {
  const isSoldOut = product.status !== "Disponível";

  const { showToast } = useToast();

  const { productSizes } = useProductSizes();

  const { actionCartLocalFn } = useCartLocal();

  const productSizesFiltered = productSizes
    ? sortProductSizes(
        productSizes.filter(
          (productSize) => productSize.productId === product.id
        )
      )
    : [];

  function sortProductSizes(sizes: ProductSizeDTO[]) {
    const order: any = {
      P: 1,
      M: 2,
      G: 3,
      GG: 4,
      "600ml": 5,
      "1L": 6,
      "2L": 7,
    };

    const arraySorted = sizes.sort((a, b) => order[a.size] - order[b.size]);

    return arraySorted;
  }

  async function handleAddProductoToCart(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (productSizesFiltered.length > 1) {
      if (onClick) {
        onClick();
        return;
      }
    }

    try {
      if (productSizesFiltered.length === 0)
        throw new Error("Product sizes is empty!");

      actionCartLocalFn({
        ...product,
        id: uuidv4(),
        originalProductId: product.id,
        amount: 1,
        observation: "",
        size: productSizesFiltered[0].size,
        priceSize: productSizesFiltered[0].price,
        actionType: "create",
      });

      showToast({
        icon: IconCircleCheckFilled,
        title: "Produto adicionado com sucesso!",
        variant: "success",
      });
    } catch (error) {
      showToast({
        icon: IconAlertTriangleFilled,
        title: "Erro ao adicionar produto. Tente novamente!",
        variant: "dark",
      });
    }
  }

  return (
    <ContainerCardProduct isSoldOut={isSoldOut} onClick={onClick}>
      <Flex style={{ gap: 28 }}>
        <Flex gap={1}>
          <Flex justify="space-between" direction="row" align="center">
            <Heading className="card-product-text">{product.name}</Heading>

            {itsOnOffer && !isSoldOut && (
              <Badge label="Oferta" color="success" />
            )}

            {isSoldOut && <Badge label="Esgotado" color="error" />}
          </Flex>

          <Label className="card-product-text">
            {product.description.toUpperCase()}
          </Label>
        </Flex>

        <Flex justify="space-between" direction="row">
          {!itsOnOffer && !priceMayVary && (
            <Text className="card-product-text" size="2" weight="bold">
              R$ {formatPrice(lowestPrice)}
            </Text>
          )}

          {!itsOnOffer && priceMayVary && (
            <Text className="card-product-text" size="2">
              A partir de{" "}
              <Text weight="bold" size="2">
                R$ {formatPrice(lowestPrice)}
              </Text>
            </Text>
          )}

          {itsOnOffer && priceOnOffer && (
            <Text className="card-product-text" size="2">
              <Text
                style={{ textDecoration: "line-through" }}
                color="var(--gray-600)"
              >
                R$ {formatPrice(lowestPrice)}
              </Text>{" "}
              <Text weight="bold">R$ {formatPrice(priceOnOffer)}</Text>
            </Text>
          )}

          <IconButton
            disabled={isSoldOut}
            className="card-product-text button-card"
            size="1"
            variant="primary"
            onClick={handleAddProductoToCart}
          >
            <IconPlus size={20} />
          </IconButton>
        </Flex>
      </Flex>
    </ContainerCardProduct>
  );
}
