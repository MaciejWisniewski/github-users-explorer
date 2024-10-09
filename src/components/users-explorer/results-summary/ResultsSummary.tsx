import { Root } from './styled';

type ResultsSummaryProps = {
  searchQuery: string;
  totalCount: number;
};

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  searchQuery,
  totalCount,
}) => {
  return (
    <Root>
      Showing {totalCount} results for {searchQuery}
    </Root>
  );
};

export default ResultsSummary;
