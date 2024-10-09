import { styled, Typography } from '@mui/material';

export const Root = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(1)};
  text-align: left;
  width: 392px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
