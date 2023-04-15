import React from 'react';
import styles from '../styles/Spinner.module.scss';

export const Spinner: React.FC<{ size?: 's' | 'm' }> = ({ size = 's' }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
};
