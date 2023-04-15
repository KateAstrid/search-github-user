import React, { useState } from 'react';
import styles from '../styles/ReposList.module.scss';
import { Repository } from '../utils/types';
import { REPOS_PER_PAGE } from '../utils/const';
import { Spinner } from './Spinner';
import Pagination from './Pagination';

export interface ReposListProps {
  reposCount: number;
  repositories: Repository[];
  username: string;
}

export const ReposList: React.FC<ReposListProps> = ({
  reposCount,
  repositories: initialRepositories,
  username
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [repositories, setRepositories] = useState(initialRepositories);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(reposCount / REPOS_PER_PAGE);

  const goToPage = async (page: number) => {
    setLoading(true);
    setCurrentPage(page);

    try {
      const response = await fetch(`/api/getNextReposPage?username=${username}&page=${page}`);
      const data: { repositories: Repository[] } = await response.json();
      setRepositories(data.repositories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.reposContainer}>
      {reposCount === 0 ? (
        <h3 className={styles.title}>This user does not have public repositories</h3>
      ) : (
        <>
          <h3 className={styles.title} data-testid='repos-title'>
            User Repositories ({reposCount})
          </h3>
          {loading ? (
            <Spinner size='m' />
          ) : (
            <>
              {repositories.map(repo => (
                <a
                  className={styles.repo}
                  key={repo.name}
                  href={repo.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className={styles.repoName}>
                    <span className={styles.repoIcon} />

                    <span data-testid={`repo-${repo.name}`}>{repo.name}</span>
                  </div>

                  <div className={styles.repoStats}>
                    <span className={styles.statContainer}>
                      <div className={styles.starsIcon} />
                      <span className={styles.count}>{repo.stars}</span>
                    </span>

                    <span className={styles.statContainer}>
                      <div className={styles.forkIcon} />
                      <span className={styles.count}>{repo.forksCount}</span>
                    </span>
                  </div>
                </a>
              ))}
            </>
          )}
          <>
            {reposCount > REPOS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                onPageChange={page => goToPage(page)}
                totalPages={totalPages}
              />
            )}
          </>
        </>
      )}
    </div>
  );
};
