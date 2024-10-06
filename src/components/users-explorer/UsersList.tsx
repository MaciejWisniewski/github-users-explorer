import React, { useState, useEffect, useCallback } from 'react';
import searchService from 'services/searchService';
import { useInfiniteQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import UserCard from 'components/users-explorer/UserCard';
import { Alert, styled } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const USERS_PER_PAGE = 5;

const SectionStyled = styled('section')`
  margin: 1rem;
`;

type UsersListProps = {
  searchQuery: string;
};

const UsersList: React.FC<UsersListProps> = ({ searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { ref, inView } = useInView();

  const getNextPage = (totalCount: number) =>
    currentPage * USERS_PER_PAGE < totalCount ? currentPage + 1 : null;

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
    queryFn: async ({ pageParam }) =>
      await searchService.searchUsers(
        searchQuery,
        pageParam + 1,
        USERS_PER_PAGE
      ),
    initialPageParam: 0,
    getNextPageParam: (searchResult) => getNextPage(searchResult.total_count),
    refetchOnWindowFocus: false,
  });

  const handleNextPage = useCallback(() => {
    setCurrentPage((currentPage) => currentPage + 1);
    fetchNextPage();
  }, [setCurrentPage, fetchNextPage]);

  useEffect(() => {
    if (inView) {
      handleNextPage();
    }
  }, [handleNextPage, inView]);

  const pages = data?.pages;
  const hasResults = pages?.length;

  return (
    <SectionStyled>
      {hasResults ? (
        <>
          {pages.map((page) =>
            page?.items?.map((user) => (
              <UserCard
                key={user.id}
                login={user.login}
                avatarUrl={user.avatar_url}
              />
            ))
          )}
          {hasNextPage ? (
            <div ref={ref}>{isFetchingNextPage && <CircularProgress />}</div>
          ) : null}
        </>
      ) : null}
      {isLoading ? <CircularProgress /> : null}
      {!isLoading && !hasResults ? (
        <Alert variant="filled" severity="info">
          No users found.
        </Alert>
      ) : null}
      {isError ? (
        <Alert
          variant="filled"
          severity="error"
        >{`There was an error: ${error.message}`}</Alert>
      ) : null}
    </SectionStyled>
  );
};

export default UsersList;
