import { Button, Flex, Text } from "@radix-ui/themes";
import { ButtonPage } from "./styles";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMediaQuery } from "react-responsive";

type Props = {
  elementsPerPage: string;
  currentPage: number;
  totalelements: number;
  paginate: (pageNumber: number) => void;
  previousPage: () => void;
  nextPage: () => void;
};

export function Paginate({
  elementsPerPage,
  currentPage,
  paginate,
  previousPage,
  nextPage,
  totalelements,
}: Props) {
  const totalPages = Math.ceil(totalelements / parseInt(elementsPerPage));

  // Detecta se o dispositivo é mobile (ex: telas com largura máxima de 600px)
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  // Função para gerar os números de página com reticências se necessário
  const getPageNumbers = () => {
    // Para mobile, exibe apenas a página anterior, atual e próxima (se existirem)
    if (isMobile) {
      const pages: number[] = [];
      if (currentPage > 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages) pages.push(currentPage + 1);
      return pages;
    }

    // Lógica para telas maiores
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    // Sempre exibe a primeira página
    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Ajusta se a página atual estiver nas proximidades do início
    if (currentPage <= 3) {
      startPage = 2;
      endPage = 4;
    }
    // Ajusta se a página atual estiver perto do final
    else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 3;
      endPage = totalPages - 1;
    }

    // Adiciona reticências se houver intervalo entre a primeira página e o início do intervalo
    if (startPage > 2) {
      pages.push("...");
    }

    // Adiciona as páginas do intervalo
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Adiciona reticências se houver intervalo entre o fim do intervalo e a última página
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Sempre exibe a última página
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Flex align={"center"} width={"100%"} justify={"center"}>
      <Flex gap={"2"}>
        <Button
          size={"2"}
          onClick={previousPage}
          variant="soft"
          color="gray"
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon size={16} />
          {!isMobile && "Anterior"}
        </Button>
        {pageNumbers.map((number, index) =>
          // Se for reticências, renderiza um texto simples
          number === "..." ? (
            <Text
              key={`ellipsis-${index}`}
              size={"2"}
              weight={"medium"}
              style={{
                alignSelf: "center",
                cursor: "default",
                userSelect: "none",
              }}
            >
              {number}
            </Text>
          ) : (
            <ButtonPage
              key={number}
              onClick={() => paginate(number as number)}
              justify={"center"}
              align={"center"}
              className={number === currentPage ? "active" : ""}
            >
              <Text size={"2"} weight={"medium"}>
                {number}
              </Text>
            </ButtonPage>
          )
        )}
        <Button
          size={"2"}
          onClick={nextPage}
          variant="soft"
          color="gray"
          disabled={currentPage === totalPages}
        >
          {!isMobile && "Próximo"}
          <ChevronRightIcon size={16} />
        </Button>
      </Flex>
    </Flex>
  );
}
