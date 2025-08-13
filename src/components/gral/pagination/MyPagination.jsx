import { Pagination, PaginationContent, PaginationEllipsis, 
         PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,} 
    from "@/components/ui/pagination"

export const MyPagination = ({ totalPages, currentPage, onPageChange }) => {

  const handlePageClick = (page) => {
    onPageChange(page); // Llama a la función para actualizar el estado en el componente padre
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              className={`bg-gray-accent-light-1 hover:bg-gray-accent-light-1 hover:text-white
                rounded-full w-7 h-7 lg:w-10 lg:h-10 text-white text-xs cursor-pointer
                ${i === currentPage ? "bg-primary-s1 hover:bg-primary-s1" : ""} `}
              onClick={(event) => { // Modificamos el onClick
                event.preventDefault(); // Previene la recarga de la página
                handlePageClick(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if ((i === currentPage - 2 && currentPage > 3) || (i === currentPage + 2 && currentPage < totalPages - 2)) {
        pages.push(<PaginationItem key={`ellipsis-${i}`}><PaginationEllipsis /></PaginationItem>);
      }
    }
    return pages;
  };

  const handlePrevious = (event) => {
    event.preventDefault();
    if (currentPage > 1)
      handlePageClick(currentPage - 1);
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (currentPage < totalPages)
      handlePageClick(currentPage + 1);
  };
  return (
    <>
    <Pagination className={"mt-5"}>
      <PaginationContent className={"gap-2"}>
        <PaginationItem>
          <PaginationPrevious className={"text-primary-s1 hover:text-primary-s1"} onClick={handlePrevious} disabled={currentPage === 1} />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext className={"text-primary-s1 hover:text-primary-s1"} onClick={handleNext} disabled={currentPage === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </>
  );
}