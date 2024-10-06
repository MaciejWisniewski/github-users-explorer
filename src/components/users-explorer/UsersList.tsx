import React from 'react';
import searchService from 'services/searchService';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import UserCard from 'components/users-explorer/UserCard';
import { Alert, styled } from '@mui/material';

const SectionStyled = styled('section')`
  margin: 1rem;
`;

type UsersListProps = {
  searchQuery: string;
};

const UsersList: React.FC<UsersListProps> = ({ searchQuery }) => {
  const searchUsersQuery = useQuery({
    queryKey: ['searchUsers', searchQuery],
    queryFn: async () => await searchService.searchUsers(searchQuery),
    refetchOnWindowFocus: false,
  });

  const loading = searchUsersQuery.isLoading;

  const displayList =
    !loading &&
    searchUsersQuery.isSuccess &&
    searchUsersQuery.data?.items?.length;

  const noResults = !loading && searchUsersQuery.data?.items?.length === 0;

  return (
    <SectionStyled>
      {displayList ? (
        <>
          {searchUsersQuery.data.items.map((user) => (
            <UserCard login={user.login} avatarUrl={user.avatar_url} />
          ))}
        </>
      ) : null}
      {loading ? <CircularProgress /> : null}
      {noResults ? (
        <Alert variant="filled" severity="info">
          No users found.
        </Alert>
      ) : null}
      {searchUsersQuery.isError ? (
        <Alert
          variant="filled"
          severity="error"
        >{`There was an error: ${searchUsersQuery.error.message}`}</Alert>
      ) : null}
    </SectionStyled>
  );
};

export default UsersList;
