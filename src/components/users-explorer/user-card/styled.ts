import { Card, styled } from '@mui/material';

export const CardStyled = styled(Card)`
  max-width: 345px;
  ${({ theme }) => `
    padding: ${theme.spacing(2)} ${theme.spacing(2)} 0 ${theme.spacing(2)};
    margin: 0 ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)};
  `}
  border: 1px solid var(--black);
  pointer-events: none;
`;
