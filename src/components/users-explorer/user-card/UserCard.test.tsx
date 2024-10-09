import { cleanup, render, screen } from '@testing-library/react';
import UserCard from 'components/users-explorer/user-card/UserCard';

afterEach(() => {
  cleanup();
});

describe('UserCard component', () => {
  test('Display user card', () => {
    const user = {
      login: 'maciejWisniewski',
      avatarUrl: 'https://avatars.githubusercontent.com/u/37402340?v=4',
    };

    render(<UserCard login={user.login} avatarUrl={user.avatarUrl} />);
    const card = screen.getByTestId(`user-card-${user.login}`);
    const image = screen.getByRole('img');

    checkCard(card, user.login);
    checkImage(image, user.avatarUrl);
  });

  test('Display user card with invalid avatar url', () => {
    const user = {
      login: 'maciejWisniewski',
      avatarUrl: 'invalidUrl',
    };

    render(<UserCard login={user.login} avatarUrl={user.avatarUrl} />);
    const card = screen.getByTestId(`user-card-${user.login}`);
    const image = screen.getByRole('img');

    checkCard(card, user.login);
    checkImage(image, user.avatarUrl);
  });
});

const checkCard = (card: HTMLElement, login: string) => {
  expect(card).toBeInTheDocument();
  expect(card).toContainHTML('img');
  expect(card).toHaveTextContent(login);
};

const checkImage = (image: HTMLElement, avatarUrl: string) => {
  expect(image.getAttribute('src')).toBe(avatarUrl);
  expect(image.getAttribute('alt')).toBeTruthy();
};
