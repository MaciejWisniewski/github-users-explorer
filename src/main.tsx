import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'styles/index.css';
import { ErrorBoundary } from 'react-error-boundary';
import { logError } from 'helpers/logger.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div>Something went wrong, refresh the page and try again.</div>
      }
      onError={(error) => logError(error)}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
