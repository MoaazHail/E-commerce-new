export interface ResponseApi<T> {
  status: string;
  results: number;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  data: T[];
}
