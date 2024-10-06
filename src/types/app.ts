export type SearchUsersResult<T> = {
  incomplete_results: boolean;
  items: T[];
  total_count: number;
};
