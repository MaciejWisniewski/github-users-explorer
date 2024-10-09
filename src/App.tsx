import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UsersExplorer from 'components/users-explorer/UsersExplorer';
import 'styles/App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersExplorer />
    </QueryClientProvider>
  );
}

export default App;
