import { Flex } from "@styles/layout";
import { ButtonPage } from "./styles";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Text } from "@styles/typography";
import { Button } from "@components/ui/Button";

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

  // Função para calcular as páginas a serem exibidas
  const getDisplayedPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const firstPage = 1;
    const lastPage = totalPages;
    const siblingCount = 1; // quantidade de páginas antes e depois da atual

    // Sempre exibe a primeira página
    pages.push(firstPage);

    // Define os limites da faixa central
    const startPage = Math.max(currentPage - siblingCount, firstPage + 1);
    const endPage = Math.min(currentPage + siblingCount, lastPage - 1);

    // Se houver uma lacuna entre a primeira página e o início da faixa central, adiciona "..."
    if (startPage > firstPage + 1) {
      pages.push("...");
    } else {
      for (let i = firstPage + 1; i < startPage; i++) {
        pages.push(i);
      }
    }

    // Adiciona as páginas do intervalo central
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Se houver uma lacuna entre o fim da faixa central e a última página, adiciona "..."
    if (endPage < lastPage - 1) {
      pages.push("...");
    } else {
      for (let i = endPage + 1; i < lastPage; i++) {
        pages.push(i);
      }
    }

    // Sempre exibe a última página, se houver mais de uma
    if (lastPage > firstPage) {
      pages.push(lastPage);
    }

    return pages;
  };

  const displayedPages = getDisplayedPages();

  return (
    <Flex
      align={"center"}
      justify={"space-between"}
      style={{ width: "100%" }}
      direction="row"
    >
      <Text size={"2"} weight={"regular"} color="gray">
        Exibindo{" "}
        {Math.min(
          (currentPage - 1) * parseInt(elementsPerPage) + 1,
          totalelements
        )}{" "}
        a {Math.min(currentPage * parseInt(elementsPerPage), totalelements)} de{" "}
        {totalelements}
      </Text>

      <Flex gap={6} direction="row">
        <Flex gap={2} direction="row" align="center">
          <Button
            size={"2"}
            onClick={previousPage}
            variant="primary"
            color="gray"
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon size={16} />
            Anterior
          </Button>

          {displayedPages.map((page, index) => {
            if (page === "...") {
              return (
                <Text key={index} size="2" weight="regular" color="gray">
                  ...
                </Text>
              );
            }
            return (
              <ButtonPage
                key={page}
                onClick={() => paginate(Number(page))}
                justify={"center"}
                align={"center"}
                className={Number(page) === currentPage ? "active" : ""}
              >
                <Text size={"2"} weight={"regular"}>
                  {page}
                </Text>
              </ButtonPage>
            );
          })}

          <Button
            size={"2"}
            onClick={nextPage}
            variant="secondary"
            color="gray"
            disabled={currentPage === totalPages}
          >
            Próximo
            <ChevronRightIcon size={16} />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
