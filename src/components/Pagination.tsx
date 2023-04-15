import React from 'react';
import styles from '../styles/Pagination.module.scss';
import { generatePages } from '../utils/generatePages';
import { PageButton } from './PageButton';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = generatePages(currentPage, totalPages);

  return (
    <div className={styles.pagesContainer} data-testid='pagination'>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        className='arrowLeft'
        disabled={currentPage === 1}
      />
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === -1 ? (
            <div className={styles.ellipsis}>...</div>
          ) : (
            <PageButton
              onClick={() => onPageChange(page)}
              disabled={page === currentPage}
              label={page}
            />
          )}
        </React.Fragment>
      ))}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='arrowRight'
      />
    </div>
  );
};

export default Pagination;
