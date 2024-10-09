import { Box, styled } from '@mui/material';

export const StickyBox = styled(Box)`
  position: sticky;
  width: 100%;
  top: 0;
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  z-index: 999;
  background-color: var(--white);
`;
