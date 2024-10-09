// Functional programming concept - pure function
export const getNextPage = (
  currentPage: number,
  perPage: number,
  totalCount: number
) => ((currentPage | 1) * perPage < totalCount ? currentPage + 1 : null);
