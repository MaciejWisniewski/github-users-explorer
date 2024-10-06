import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import 'styles/index.css';
import { ErrorBoundary } from 'react-error-boundary';
import { logError } from 'helpers/logger.ts';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div>Something went wrong, refresh the page and try again.</div>
      }
      onError={(error) => logError(error)}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
