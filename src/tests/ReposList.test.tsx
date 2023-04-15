import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReposList, ReposListProps } from '../components/ReposList';

const mockRepositories = [
  { name: 'repo1', url: 'https://github.com/user/repo1', stars: 5, forksCount: 2 },
  { name: 'repo2', url: 'https://github.com/user/repo2', stars: 10, forksCount: 1 }
];

const nextPageRepos = [
  { name: 'repo11', url: 'https://github.com/user/repo11', stars: 6, forksCount: 1 },
  { name: 'repo12', url: 'https://github.com/user/repo12', stars: 10, forksCount: 1 },
  { name: 'repo13', url: 'https://github.com/user/repo13', stars: 1, forksCount: 9 },
  { name: 'repo14', url: 'https://github.com/user/repo14', stars: 10, forksCount: 1 }
];

const moreThanTenRepos = [
  ...mockRepositories,
  { name: 'repo3', url: 'https://github.com/user/repo3', stars: 10, forksCount: 1 },
  { name: 'repo4', url: 'https://github.com/user/repo4', stars: 7, forksCount: 1 },
  { name: 'repo5', url: 'https://github.com/user/repo5', stars: 10, forksCount: 1 },
  { name: 'repo6', url: 'https://github.com/user/repo6', stars: 1, forksCount: 8 },
  { name: 'repo7', url: 'https://github.com/user/repo7', stars: 10, forksCount: 1 },
  { name: 'repo8', url: 'https://github.com/user/repo8', stars: 13, forksCount: 5 },
  { name: 'repo9', url: 'https://github.com/user/repo9', stars: 16, forksCount: 1 },
  { name: 'repo10', url: 'https://github.com/user/repo10', stars: 10, forksCount: 1 },
  ...nextPageRepos
];

const REPOS_COUNT = 2;
const USERNAME = 'testuser';
const headers = new Headers();

const partResponse = {
  headers,
  ok: true,
  redirected: false,
  status: 200,
  statusText: '',
  type: 'default',
  url: ''
};

global.fetch = jest.fn().mockImplementation(() => {
  const response = {
    json: () => Promise.resolve({ repositories: mockRepositories }),
    ...partResponse
  };
  return Promise.resolve(response);
});

const defaultProps: ReposListProps = {
  reposCount: REPOS_COUNT,
  repositories: mockRepositories,
  username: USERNAME
};

describe('ReposList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders title with no repositories if user has no repositories', async () => {
    render(<ReposList {...defaultProps} reposCount={0} repositories={[]} />);
    expect(screen.getByText(/This user does not have public repositories/i)).toBeInTheDocument();
  });

  it('renders repositories without pagination if user has less then 10 of them', async () => {
    render(<ReposList {...defaultProps} />);
    const title = screen.getByTestId('repos-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(`User Repositories (${REPOS_COUNT})`);

    expect(screen.getByTestId('repo-repo1')).toBeInTheDocument();
    expect(screen.getByTestId('repo-repo2')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('shows pagination if user has more than ten repos and fetches and displays more repositories on page click', async () => {
    render(
      <ReposList
        {...defaultProps}
        repositories={moreThanTenRepos}
        reposCount={moreThanTenRepos.length}
      />
    );
    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ repositories: nextPageRepos }),
      ...partResponse
    } as Response);

    act(() => fireEvent.click(screen.getByTestId('page-2')));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    waitFor(() => expect(screen.getByTestId('repo-repo11')).toBeInTheDocument());
    waitFor(() => expect(screen.getByTestId('repo-repo12')).toBeInTheDocument());
  });
});
