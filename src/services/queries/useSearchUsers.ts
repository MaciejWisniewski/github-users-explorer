import searchService from 'services/searchService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getNextPage } from 'utils/pagination';

const USERS_PER_PAGE = 5;

export const useSearchUsers = (searchQuery: string, currentPage: number) => {
  const {
    data,
    error,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['searchUsers', searchQuery],
    queryFn: async ({ pageParam, signal }) =>
      await searchService.searchUsers(
        searchQuery,
        pageParam + 1,
        USERS_PER_PAGE,
        signal
      ),
    initialPageParam: 0,
    getNextPageParam: (searchResult) =>
      getNextPage(currentPage, USERS_PER_PAGE, searchResult.total_count),
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  };
};
