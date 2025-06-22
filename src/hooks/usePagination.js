import { useState } from 'react';

export const usePagination = (items, page = 1, perPage) => {
  const [activePage, setActivePage] = useState(page);

  const handleNextPage = () => {
    setActivePage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setActivePage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleGoToPage = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const totalPages = Math.ceil((items.length) / perPage);
  const offset = perPage * (activePage - 1);
  const paginatedItems = items.slice(offset, perPage * activePage);

  return {
    activePage,
    nextPage: handleNextPage,
    previousPage: handlePreviousPage,
    goToPage: handleGoToPage,
    totalPages,
    totalItems: items.length,
    items: paginatedItems,
    setActivePage,
  };
};
