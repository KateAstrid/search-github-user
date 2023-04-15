import { DELTA_PAGES } from './const';

export function generatePages(currentPage: number, totalPages: number) {
  const leftSidePage = currentPage - DELTA_PAGES;
  const rightSidePage = currentPage + DELTA_PAGES + 1;
  const rangeShownPages: number[] = [];
  const pagesButtons: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= leftSidePage && i < rightSidePage)) {
      rangeShownPages.push(i);
    }
  }

  let lastPageInLoop: number | undefined;

  rangeShownPages.forEach(page => {
    if (lastPageInLoop) {
      const pageDifference = page - lastPageInLoop;

      if (pageDifference === 2) {
        pagesButtons.push(lastPageInLoop + 1);
      } else if (pageDifference > 2) {
        pagesButtons.push(-1);
      }
    }

    pagesButtons.push(page);
    lastPageInLoop = page;
  });

  return pagesButtons;
}
