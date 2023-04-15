import { generatePages } from '../utils/generatePages';

describe('generatePages', () => {
  it('should generate correct pagination with totalPages less than 2 * DELTA_PAGES + 1', () => {
    const currentPage = 4;
    const totalPages = 7;

    const result = generatePages(currentPage, totalPages);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should generate correct pagination with currentPage in the first half of totalPages', () => {
    const currentPage = 4;
    const totalPages = 15;

    const result = generatePages(currentPage, totalPages);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, -1, 15]);
  });

  it('should generate correct pagination with currentPage in the middle of totalPages', () => {
    const currentPage = 8;
    const totalPages = 15;

    const result = generatePages(currentPage, totalPages);

    expect(result).toEqual([1, -1, 6, 7, 8, 9, 10, -1, 15]);
  });

  it('should generate correct pagination with currentPage in the last half of totalPages', () => {
    const currentPage = 12;
    const totalPages = 15;

    const result = generatePages(currentPage, totalPages);

    expect(result).toEqual([1, -1, 10, 11, 12, 13, 14, 15]);
  });

  it('should generate correct pagination with currentPage equals to 1', () => {
    const currentPage = 1;
    const totalPages = 15;

    const result = generatePages(currentPage, totalPages);

    expect(result).toEqual([1, 2, 3, -1, 15]);
  });

  it('should generate correct pagination with currentPage equals to totalPages', () => {
    const currentPage = 15;
    const totalPages = 15;

    const result = generatePages(currentPage, totalPages);

    expect(result).toEqual([1, -1, 13, 14, 15]);
  });
});
