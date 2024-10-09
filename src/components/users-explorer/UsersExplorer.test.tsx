import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersExplorer from 'components/users-explorer/UsersExplorer';
import { ReactNode } from 'react';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  render(<UsersExplorer />, { wrapper: queryClientProvider() });
});

describe('UsersExplorer component', () => {
  test('Search query sticky box content', () => {
    const stickyBox = screen.getByTestId('sticky-box');
    const header = screen.getByRole('heading');
    const input = screen.getByRole('textbox');

    expect(stickyBox).toBeInTheDocument();
    expect(window.getComputedStyle(stickyBox)?.position).toBe('sticky');
    expect(header).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input.getAttribute('placeholder')).toBe('Enter username');
  });

  describe('Input search query validation', () => {
    test('Empty input', async () => {
      const input = screen.getByRole('textbox');

      await act(async () => {
        input.focus();
        input.blur();
      });
      const error = screen.queryByText('Enter at least 3 characters');

      expect(input).toHaveValue('');
      expect(error).toBeInTheDocument();
    });

    test('Enter 2 characters', async () => {
      const input = screen.getByRole('textbox');
      const searchQuery = 'ma';

      await userEvent.type(input, searchQuery);
      await act(async () => {
        input.focus();
        input.blur();
      });
      const error = screen.queryByText('Enter at least 3 characters');

      expect(input).toHaveValue(searchQuery);
      expect(error).toBeInTheDocument();
    });

    test('Enter 3 characters', async () => {
      const input = screen.getByRole('textbox');
      const searchQuery = 'mac';

      await userEvent.type(input, searchQuery);

      await act(async () => {
        input.focus();
        input.blur();
      });
      const error = screen.queryByText('Enter at least 3 characters');

      expect(input).toHaveValue(searchQuery);
      expect(error).toBeNull();
    });
  });
});

const queryClientProvider = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
