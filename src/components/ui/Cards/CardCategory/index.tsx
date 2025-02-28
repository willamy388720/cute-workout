import { ContainerCardCategory, ImageCategory } from "./styles";
import { Heading } from "@styles/typography";

import { Category, getCategoryStyleMap } from "@utils/pages/categoryStyleMap";

type CardCategoryProps = {
  category: Category;
};

export function CardCategory({ category }: CardCategoryProps) {
  const { color, title, image } = getCategoryStyleMap(category as Category);

  return (
    <ContainerCardCategory color={color}>
      <Heading size="1">{title}</Heading>

      <ImageCategory src={image} alt="" />
    </ContainerCardCategory>
  );
}
