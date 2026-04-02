export type PaginatedResponse<T> = {
  page_number: number;
  page_size: number;
  total_elements: number;
  total_pages: number;
  content: T[];
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  elementCount: number;
  pageNumber: number;
  pageSize: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};
