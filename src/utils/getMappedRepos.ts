import { GitHubRepo, Repository } from './types';

export const getMappedRepos = (repositories: GitHubRepo[]): Repository[] => {
  return repositories.map(repo => ({
    name: repo.name,
    url: repo.html_url,
    stars: repo.stargazers_count,
    forksCount: repo.forks_count
  }));
};
