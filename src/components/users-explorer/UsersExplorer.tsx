import React, { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import InputField from '../form/InputField';
import UsersList from 'components/users-explorer/UsersList';

const SEARCH_QUERY_DEBOUNCE_MS = 2000;

const UsersExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(
    searchQuery,
    SEARCH_QUERY_DEBOUNCE_MS
  );

  return (
    <main>
      <h1>Github Users Explorer</h1>
      <p>Search for Github users!</p>
      <InputField
        placeholder="Enter username"
        onChange={(e) => setSearchQuery(e?.target?.value)}
      />
      <UsersList searchQuery={debouncedSearchQuery} />
    </main>
  );
};

export default UsersExplorer;
