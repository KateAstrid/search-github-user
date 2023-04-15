export async function fetchGitHubData<T>(url: string): Promise<{ data: T; status: number }> {
  const accessToken = process.env.GITHUB_ACCESS_TOKEN;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  const response = await fetch(url, { headers });

  const data = await response.json();
  const status = response.status;

  return { data, status };
}
