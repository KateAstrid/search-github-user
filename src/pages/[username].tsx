import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/UserPage.module.scss';
import { getInitialUserData } from '../utils/getInitialUserData';
import { Repository, User } from '../utils/types';
import { ReposList } from '../components/ReposList';

interface UserPageProps {
  user: User;
  repositories: Repository[];
}

export const getServerSideProps: GetServerSideProps<UserPageProps> = async context => {
  const username = Array.isArray(context.params?.username)
    ? context.params?.username[0]
    : context.params?.username;

  if (!username) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    };
  }

  try {
    const { user, repositories } = await getInitialUserData(username);
    return {
      props: { user, repositories }
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    };
  }
};

const UserPage: NextPage<UserPageProps> = ({ user, repositories }) => {
  return (
    <div className={styles.pageContainer}>
      <Link href='/' className={styles.backButton} />
      <div className={styles.userContainer}>
        <img className={styles.avatar} src={user.avatar} alt={`${user.name}'s avatar`} />

        <div className={styles.userInfo}>
          <h2>{user.name}</h2>
          <a
            href={user.url}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.profileLink}
          >
            Go to GitHub Profile
          </a>
        </div>
      </div>

      <ReposList
        reposCount={user.reposCount}
        repositories={repositories}
        username={user.username}
      />
    </div>
  );
};

export default UserPage;
