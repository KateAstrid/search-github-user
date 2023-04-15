export interface User {
  name: string;
  avatar: string;
  url: string;
  reposCount: number;
  username: string;
}

export interface Repository {
  name: string;
  url: string;
  stars: number;
  forksCount: number;
}

export interface GitHubUser {
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  login: string;
}

export interface GitHubRepo {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
}
