import { useMemo, useState } from "react";

type UsePaginationProps<T> = {
  data: T[] | undefined;
  itemsPerPage?: number;
};

export function usePagination<T>({
  data,
  itemsPerPage = 8,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const elements = useMemo(() => {
    if (!data || data.length === 0) return [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  function paginate(pageNumber: number) {
    if (!data) return;
    setCurrentPage(pageNumber);
  }

  function previousPage() {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }

  function nextPage() {
    if (data && currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function resetCurrentPage() {
    setCurrentPage(1);
  }

  return {
    currentPage,
    elements,
    paginate,
    previousPage,
    nextPage,
    resetCurrentPage,
  };
}
