import React from "react";
import { Button, ActiveBtn, Pagination } from "./styles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageClick: (page: number) => void;
}

const Paginations: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onPageClick,
}) => {
  const renderPages = () => {
    const pagesToShow = 10;
    const ellipsis = totalPages > pagesToShow && currentPage < totalPages - 5;

    let startPage = 1;
    let endPage = totalPages;

    if (ellipsis) {
      if (currentPage > 5) {
        startPage = currentPage - 4;
        endPage = currentPage + 5;
      } else {
        startPage = 1;
        endPage = pagesToShow;
      }
    }

    const pages = [];

    for (let page = startPage; page <= endPage; page++) {
      if (currentPage === page) {
        pages.push(
          <ActiveBtn key={page} onClick={() => onPageClick(page)}>
            {page}
          </ActiveBtn>
        );
      } else {
        pages.push(
          <Button key={page} onClick={() => onPageClick(page)}>
            {page}
          </Button>
        );
      }
    }

    if (ellipsis) {
      pages.unshift(
        <Button key="previous-ellipsis" onClick={onPrevPage}>
          ...
        </Button>
      );

      pages.push(
        <Button key="next-ellipsis" onClick={onNextPage}>
          ...
        </Button>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <Button onClick={onPrevPage} disabled={currentPage === 1}>
        &lt;
      </Button>
      {renderPages()}
      <Button onClick={onNextPage} disabled={currentPage === totalPages}>
        &gt;
      </Button>
    </Pagination>
  );
};

export default Paginations;
