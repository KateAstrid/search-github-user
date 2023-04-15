import { GITHUB_URL, REPOS_PER_PAGE } from './const';
import { fetchGitHubData } from './fetchGitHubData';
import { getMappedRepos } from './getMappedRepos';
import { GitHubRepo, GitHubUser, Repository, User } from './types';

export async function getInitialUserData(
  username: string
): Promise<{ user: User; repositories: Repository[] }> {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetchGitHubData<GitHubUser>(`${GITHUB_URL}/${username}`),
      fetchGitHubData<GitHubRepo[]>(`${GITHUB_URL}/${username}/repos?per_page=${REPOS_PER_PAGE}`)
    ]);

    const user: User = {
      name: userResponse.data.name,
      avatar: userResponse.data.avatar_url,
      url: userResponse.data.html_url,
      reposCount: userResponse.data.public_repos,
      username: userResponse.data.login
    };

    const repositories = getMappedRepos(reposResponse.data);

    return { user, repositories };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
