export type PaginatedResponse<T> = {
  page_number: number;
  page_size: number;
  total_elements: number;
  total_pages: number;
  has_next: boolean;
  content: T[];
};
