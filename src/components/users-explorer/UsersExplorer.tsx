import React, { useCallback, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import InputField from '../form/InputField';
import UsersList from 'components/users-explorer/UsersList';

import { Alert, Box, CircularProgress } from '@mui/material';
import { useSearchUsers } from 'services/queries/useSearchUsers';

const SEARCH_QUERY_DEBOUNCE_MS = 2000;

const UsersExplorer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(
    searchQuery,
    SEARCH_QUERY_DEBOUNCE_MS
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchQuery]);

  const {
    data,
    error,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  } = useSearchUsers(debouncedSearchQuery, currentPage);

  const handleNextPage = useCallback(() => {
    setCurrentPage((currentPage) => currentPage + 1);
    fetchNextPage();
  }, [setCurrentPage, fetchNextPage]);

  const pages = data?.pages;
  const users = pages?.flatMap((page) => page.items).filter(Boolean) || [];

  return (
    <main>
      <h1>Github Users Explorer</h1>
      <p>Search for Github users!</p>
      <InputField
        placeholder="Enter username"
        onChange={(e) => setSearchQuery(e?.target?.value)}
      />
      <Box sx={{ p: 2 }}>
        {!isLoading && debouncedSearchQuery ? (
          <UsersList
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            users={users}
            onNextPage={handleNextPage}
          />
        ) : null}
        {isLoading ? <CircularProgress /> : null}
        {!isLoading && isError ? (
          <Alert
            variant="filled"
            severity="error"
          >{`There was an error: ${error?.message}`}</Alert>
        ) : null}
      </Box>
    </main>
  );
};

export default UsersExplorer;
