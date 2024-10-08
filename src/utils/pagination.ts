// Functional programming concept - pure function
export const getNextPage = (
  currentPage: number,
  perPage: number,
  totalCount: number
) => (currentPage * perPage < totalCount ? currentPage + 1 : null);
