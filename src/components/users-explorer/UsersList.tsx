import React from 'react';
import searchService from 'services/searchService';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import UserCard from 'components/users-explorer/UserCard';

type UsersListProps = {
  searchQuery: string;
};

const UsersList: React.FC<UsersListProps> = ({ searchQuery }) => {
  const searchUsersQuery = useQuery({
    queryKey: ['searchUsers', searchQuery],
    queryFn: async () => await searchService.searchUsers(searchQuery),
    refetchOnWindowFocus: false,
  });

  return (
    <section>
      {searchUsersQuery.isLoading && <CircularProgress />}
      {searchUsersQuery.isSuccess && searchUsersQuery.data?.items?.length ? (
        <>
          {searchUsersQuery.data.items.map((user) => (
            <UserCard login={user.login} avatarUrl={user.avatar_url} />
          ))}
        </>
      ) : null}
    </section>
  );
};

export default UsersList;
