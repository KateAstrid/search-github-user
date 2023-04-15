import { GITHUB_URL, REPOS_PER_PAGE } from './const';
import { fetchGitHubData } from './fetchGitHubData';
import { getMappedRepos } from './getMappedRepos';
import { GitHubRepo, Repository } from './types';

export async function getNextReposPage(
  username: string,
  page: number
): Promise<{ repositories: Repository[] }> {
  try {
    const reposResponse = await fetchGitHubData<GitHubRepo[]>(
      `${GITHUB_URL}/${username}/repos?per_page=${REPOS_PER_PAGE}&page=${page}`
    );

    const repositories = getMappedRepos(reposResponse.data);
    return { repositories };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
