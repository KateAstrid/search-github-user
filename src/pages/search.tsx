import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../styles/SearchPage.module.scss';
import { Spinner } from '../components/Spinner';

const SearchPage: NextPage = () => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSearch = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`/api/checkUserExists?username=${username}`);
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
      } else {
        router.push(`/${username}`);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please try again later');
    } finally {
      setLoading(false);
    }
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && username !== '') {
      onSearch();
    }
  };

  const onClick = () => {
    if (username !== '') {
      onSearch();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title} data-testid='page-title'>
        GitHub User Search
      </h1>
      <div className={styles.searchContainer}>
        <input
          type='text'
          value={username}
          className={styles.input}
          placeholder='Search for GitHub user'
          data-testid='search-input'
          onChange={event => event.target.value !== ' ' && setUsername(event.target.value)}
          onKeyDown={onInputKeyDown}
          spellCheck={false}
        />
        <div className={styles.iconContainer} onClick={onClick} data-testid='search-icon'>
          <div className={styles.icon} />
        </div>
      </div>
      <div className={styles.additions}>
        {loading && <Spinner />}
        {errorMessage && (
          <div className={styles.error} data-testid='error-message'>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
