export type SearchResult<T> = {
  incomplete_results: boolean;
  items: T[];
  total_count: number;
};
