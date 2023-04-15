import React from 'react';
import styles from '../styles/Pagination.module.scss';

interface PageButtonProps {
  label?: number | string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const PageButton: React.FC<PageButtonProps> = ({ label, onClick, disabled, className }) => {
  return (
    <button
      data-testid={`page-${label}`}
      onClick={onClick}
      disabled={disabled}
      className={className ? styles[className] : styles.pageButton}
    >
      {label}
    </button>
  );
};
