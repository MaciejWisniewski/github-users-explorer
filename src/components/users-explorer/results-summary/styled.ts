import { styled, Typography } from '@mui/material';

export const Root = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(1)};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 392px;

  @media only screen and (max-width: 600px) {
    width: 340px;
  }
`;
