import React, { useState } from 'react';
import InputField from '../form/InputField';
import searchService from 'services/searchService';
import { useDebounce } from '@uidotdev/usehooks';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';

const SEARCH_QUERY_DEBOUNCE_MS = 2000;

const UsersExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(
    searchQuery,
    SEARCH_QUERY_DEBOUNCE_MS
  );

  const searchUsersQuery = useQuery({
    queryKey: ['searchUsers', debouncedSearchQuery],
    queryFn: async () => await searchService.searchUsers(debouncedSearchQuery),
    refetchOnWindowFocus: false,
  });

  return (
    <main>
      <h1>Github Users Explorer</h1>
      <p>Search for Github users!</p>
      <InputField
        placeholder="Enter username"
        onChange={(e) => setSearchQuery(e?.target?.value)}
      />
      {searchUsersQuery.isLoading && <CircularProgress />}
      {searchUsersQuery.isSuccess && searchUsersQuery.data?.items?.length ? (
        <ul>
          {searchUsersQuery.data.items.map((user) => (
            <li>{user.login}</li>
          ))}
        </ul>
      ) : null}
    </main>
  );
};

export default UsersExplorer;
