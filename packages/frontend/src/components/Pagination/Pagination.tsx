import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-bootstrap/Pagination";

import { setPage, setFavoritesPage } from "../../store/filtersSlice";

import "./styles.css";

const scrollToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

interface MoviesPaginationProps {
  itemsCount: number;
  itemsPerPage: number;
  filter: string;
}

const MoviesPagination: React.FC<MoviesPaginationProps> = ({
  itemsCount,
  itemsPerPage,
  filter,
}) => {
  const filters = useSelector((state: any) => state.filters[filter]);

  const dispatch = useDispatch();
  const currentPage = useSelector((state: any) => state.filters[filter].page);

  const pagesCount = Math.ceil(itemsCount / itemsPerPage);
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const changePage = (number: number) => {
    if (currentPage === number) return;

    dispatch(setPage(number));

    filter === "featuredFilters"
      ? dispatch(setPage(number))
      : dispatch(setFavoritesPage(number));
    scrollToTop();
  };

  const onPageNumberClick = (pageNumber: number) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage(currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      filter === "featuredFilters"
        ? dispatch(setPage(pagesCount))
        : dispatch(setFavoritesPage(pagesCount));
    }
  };

  let isPageNumberOutOfRange: boolean | undefined;

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <Container className="d-flex align-items-center justify-content-center movie-pagination">
      <Pagination>
        <Pagination.Prev
          onClick={onPreviousPageClick}
          disabled={isCurrentPageFirst}
        />
        {pageNumbers}
        <Pagination.Next
          onClick={onNextPageClick}
          disabled={isCurrentPageLast}
        />
      </Pagination>
    </Container>
  );
};

export default MoviesPagination;
