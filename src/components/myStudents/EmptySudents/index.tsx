import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Users } from "lucide-react";

type EmptySudentsProps = {
  saveIsOpenModal: (value: boolean) => void;
};

export function EmptySudents({ saveIsOpenModal }: EmptySudentsProps) {
  return (
    <Flex
      direction={"column"}
      width={"100%"}
      align={"center"}
      justify={"center"}
      gap={"3"}
    >
      <Users size={100} color="var(--gray-9)" />

      <Flex direction={"column"} align={"center"}>
        <Heading>Nenhum aluno</Heading>
        <Text>Adicione alunos aqui aqui</Text>
      </Flex>

      <Button size={"3"} onClick={() => saveIsOpenModal(true)}>
        Adicionar aluno
      </Button>
    </Flex>
  );
}
