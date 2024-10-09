import { getNextPage } from 'utils/pagination';

describe('Get the next pagination page', () => {
  test('Get second page', () => {
    const currentPage = 0;
    const perPage = 5;
    const totalCount = 14;

    const nextPage = getNextPage(currentPage, perPage, totalCount);

    expect(nextPage).toBe(1);
  });

  test('Get next page', () => {
    const currentPage = 2;
    const perPage = 5;
    const totalCount = 100;

    const nextPage = getNextPage(currentPage, perPage, totalCount);

    expect(nextPage).toBe(3);
  });

  test('First page is the only (partial) page', () => {
    const currentPage = 0;
    const perPage = 15;
    const totalCount = 14;

    const nextPage = getNextPage(currentPage, perPage, totalCount);

    expect(nextPage).toBe(null);
  });

  test('First page is the only (full) page', () => {
    const currentPage = 0;
    const perPage = 15;
    const totalCount = 15;

    const nextPage = getNextPage(currentPage, perPage, totalCount);

    expect(nextPage).toBe(null);
  });

  test('Get the last (partial) page', () => {
    const currentPage = 1;
    const perPage = 5;
    const totalCount = 14;

    const nextPage = getNextPage(currentPage, perPage, totalCount);

    expect(nextPage).toBe(2);
  });

  test('Get the last (full) page', () => {
    const currentPage = 1;
    const perPage = 5;
    const totalCount = 15;

    const nextPage = getNextPage(currentPage, perPage, totalCount);

    expect(nextPage).toBe(2);
  });

  test('Current page is the last (partial) page', () => {
    const currentPage = 2;
    const perPage = 5;
    const totalCount = 14;

    const nextPage = getNextPage(currentPage, perPage, totalCount);

    expect(nextPage).toBe(null);
  });

  test('Current page is the last (full) page', () => {
    const currentPage = 2;
    const perPage = 5;
    const totalCount = 15;

    const nextPage = getNextPage(currentPage, perPage, totalCount);

    expect(nextPage).toBe(null);
  });
});
