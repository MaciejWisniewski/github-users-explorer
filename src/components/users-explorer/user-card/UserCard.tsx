import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { CardStyled } from 'components/users-explorer/user-card/styled';
import React from 'react';

type UserCardProps = {
  login: string;
  avatarUrl: string;
};

const UserCard: React.FC<UserCardProps> = ({ login, avatarUrl }) => {
  return (
    <CardStyled data-testid={`user-card-${login}`}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={avatarUrl}
          alt="avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {login}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CardStyled>
  );
};

export default UserCard;
