import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import UsersList from 'components/users-explorer/UsersList';
import {
  Alert,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useSearchUsers } from 'services/queries/useSearchUsers';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';
import ResultsSummary from 'components/users-explorer/ResultsSummary';

const SEARCH_QUERY_DEBOUNCE_MS = 2000;

type FormInput = {
  searchQuery: string;
};

const validationSchema = yup.object({
  searchQuery: yup
    .string()
    .min(3, 'Enter at least 3 characters')
    .required('Required'),
});

const UsersExplorer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { register, trigger } = useForm<FormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: { searchQuery: '' },
  });

  const {
    data,
    error,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  } = useSearchUsers(debouncedSearchQuery, currentPage);

  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchQuery]);

  const handleNextPage = useCallback(() => {
    setCurrentPage((currentPage) => currentPage + 1);
    fetchNextPage();
  }, [setCurrentPage, fetchNextPage]);

  const handleSearchQueryChange = debounce(async (e) => {
    // blur() and focus() here are only for the purpose of making react-hook-form validation work. Regardless of mode it validates the field only when the input is blurred
    inputRef?.current?.blur();
    const isValid = await trigger();
    if (isValid) setDebouncedSearchQuery(e.target.value);
    inputRef?.current?.focus();
  }, SEARCH_QUERY_DEBOUNCE_MS);

  const pages = data?.pages;
  const users = pages?.flatMap((page) => page.items).filter(Boolean) || [];

  return (
    <main>
      <h1>Github Users Explorer</h1>
      <Typography sx={{ mb: 2 }}>Search for Github users!</Typography>
      <TextField
        variant="outlined"
        placeholder="Enter username"
        {...register('searchQuery')}
        onChange={handleSearchQueryChange}
        inputRef={inputRef}
        sx={{ width: '100%' }}
      />
      {!isLoading && debouncedSearchQuery && pages ? (
        <ResultsSummary
          searchQuery={debouncedSearchQuery}
          totalCount={pages[0]?.total_count}
        />
      ) : null}
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
