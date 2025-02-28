import { Flex } from "@styles/layout";
import { ContainerCardItem, ContentCardItem, IsSoldOut } from "./styles";
import { Label, Link, Text } from "@styles/typography";
import { Badge } from "@components/ui/Badge";
import {
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { formatPrice } from "@utils/pages/formatPrice";
import { useCartLocal } from "@hooks/useCartLocal";
import { ProductCartDTO } from "@dtos/productCartDTO";
import { useToast } from "@hooks/useToast";

type CardItemProps = {
  product: ProductCartDTO;
  onEditOrder: () => void;
  isSoldOut?: boolean;
};

export function CardItem({ product, onEditOrder, isSoldOut }: CardItemProps) {
  const { actionCartLocalFn } = useCartLocal();

  const { showToast } = useToast();

  async function handleDeleteOrder() {
    try {
      await actionCartLocalFn({ ...product, actionType: "delete" });
      showToast({
        icon: IconCircleCheckFilled,
        title: "Produto removido com sucesso!",
        variant: "success",
      });
    } catch (error) {
      showToast({
        icon: IconAlertTriangleFilled,
        title: "Erro ao remover produto. Tente novamente!",
        variant: "dark",
      });
    }
  }

  return (
    <ContainerCardItem isSoldOut={isSoldOut}>
      {isSoldOut && (
        <IsSoldOut>
          <Text weight="bold" color="var(--white)">
            Produto Esgotado
          </Text>
        </IsSoldOut>
      )}

      <ContentCardItem>
        <Flex gap={3}>
          <Flex style={{ gap: 2 }}>
            <Flex justify="space-between" direction="row" align="center">
              <Badge label={product.categoryName} color="gray" />
              <Text size="2" weight="bold">
                R$ {formatPrice(product.priceSize * product.amount)}
              </Text>
            </Flex>

            <Flex gap={1} align="center" direction="row">
              <Text size="1" color="var(--gray-800)">
                {product.amount}x
              </Text>

              <Text size="1" color="var(--gray-800)" weight="bold">
                {product.name}
              </Text>
            </Flex>

            <Label color="var(--gray-600)">Tamanho {product.size}</Label>

            {product.observation.trim() !== "" && (
              <Label color="var(--gray-600)">OBS: {product.observation}</Label>
            )}
          </Flex>

          <Flex gap={4} direction="row" align="center">
            {!isSoldOut && (
              <Link size="1" color="var(--gray-700)" onClick={onEditOrder}>
                <IconPencil color="var(--gray-700)" size={16} />
                Editar
              </Link>
            )}

            <Link
              size="1"
              color="var(--danger-500)"
              onClick={handleDeleteOrder}
            >
              <IconTrash size={16} />
              Remover
            </Link>
          </Flex>
        </Flex>
      </ContentCardItem>
    </ContainerCardItem>
  );
}
