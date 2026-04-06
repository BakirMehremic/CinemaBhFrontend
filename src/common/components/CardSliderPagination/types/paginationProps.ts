export type PaginationProps = {
  totalPages: number;
  totalElements: number;
  elementCount: number;
  pageNumber: number;
  pageSize: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};
