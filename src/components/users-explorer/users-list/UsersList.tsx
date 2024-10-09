import React, { useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import UserCard from 'components/users-explorer/user-card/UserCard';
import { useInView } from 'react-intersection-observer';
import { User } from 'types/domain';

type UsersListProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  users: User[];
  onNextPage: () => void;
};

const UsersList: React.FC<UsersListProps> = ({
  hasNextPage,
  isFetchingNextPage,
  users,
  onNextPage,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      onNextPage();
    }
  }, [onNextPage, inView]);

  return (
    <>
      {users?.length ? (
        users.map((user: User) => (
          <UserCard
            key={user.id}
            login={user.login}
            avatarUrl={user.avatar_url}
          />
        ))
      ) : (
        <Alert variant="filled" severity="info">
          No users found.
        </Alert>
      )}
      {hasNextPage ? (
        <div ref={ref}>{isFetchingNextPage && <CircularProgress />}</div>
      ) : null}
    </>
  );
};

export default UsersList;
