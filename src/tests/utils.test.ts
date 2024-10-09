import { getNextPage } from 'utils/pagination';

test('Get the next pagination page', () => {
  const currentPage = 0;
  const perPage = 5;
  const totalCount = 14;
  const nextPage = getNextPage(currentPage, perPage, totalCount);

  expect(nextPage).toBe(1);
});
