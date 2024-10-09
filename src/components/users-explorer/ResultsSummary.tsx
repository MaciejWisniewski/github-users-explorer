import { Typography } from '@mui/material';

type ResultsSummaryProps = {
  searchQuery: string;
  totalCount: number;
};

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  searchQuery,
  totalCount,
}) => {
  return (
    <Typography sx={{ mt: 2 }}>
      Showing {totalCount} results for {searchQuery}
    </Typography>
  );
};

export default ResultsSummary;
