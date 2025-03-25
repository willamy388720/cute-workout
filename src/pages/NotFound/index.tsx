import { Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <Flex
      width={"100%"}
      height={"100vh"}
      align={"center"}
      justify={"center"}
      direction={"column"}
      gap={"3"}
    >
      <Text size={"9"} weight={"bold"}>
        404
      </Text>
      <Text size={"5"}>Oops! Página não encontrada</Text>
      <Link to="/">Retornar para a página inicial</Link>
    </Flex>
  );
}
