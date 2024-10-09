import { styled, Typography } from '@mui/material';

const TypographyStyled = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(1)};
  text-align: left;
  width: 400px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

type ResultsSummaryProps = {
  searchQuery: string;
  totalCount: number;
};

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  searchQuery,
  totalCount,
}) => {
  return (
    <TypographyStyled>
      Showing {totalCount} results for {searchQuery}
    </TypographyStyled>
  );
};

export default ResultsSummary;
