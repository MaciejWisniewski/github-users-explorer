import { Box, styled } from '@mui/material';

export const StickyBox = styled(Box)`
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 999;
  background-color: var(--white);
`;
