import { GITHUB_URL } from './const';
import { fetchGitHubData } from './fetchGitHubData';
import { GitHubUser } from './types';

export async function checkUserExists(username: string): Promise<{ status: number }> {
  try {
    const userResponse = await fetchGitHubData<GitHubUser>(`${GITHUB_URL}/${username}`);

    if (userResponse.status === 404) {
      throw new Error('Sorry, user not found');
    } else return { status: 200 };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
