import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';

const CardStyled = styled(Card)`
  max-width: 345px;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid var(--black);
`;

type UserCardProps = {
  login: string;
  avatarUrl: string;
};

const UserCard: React.FC<UserCardProps> = ({ login, avatarUrl }) => {
  return (
    <CardStyled>
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
