import React from 'react';
import Link from 'next/link';
import styles from '../styles/ErrorPage.module.scss';

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.icon} />
      <div className={styles.text}>This user could not be found</div>
      <Link href='/' className={styles.backButton}>
        Back to the home page
      </Link>
    </div>
  );
};

export default ErrorPage;
