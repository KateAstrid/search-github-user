import type { NextApiRequest, NextApiResponse } from 'next';
import { getNextReposPage } from '../../utils/getNextReposPage';
import { Repository } from '../../utils/types';

type Data = {
  repositories: Repository[];
};

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  const { username, page } = req.query;

  if (typeof username !== 'string') {
    res.status(400).json({ message: 'Invalid request: userName should be a string.' });
    return;
  }

  if (typeof page !== 'string') {
    res.status(400).json({ message: 'Invalid request: page should be a string.' });
    return;
  }

  try {
    const response = await getNextReposPage(username, Number(page));
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    res.status(500).json({ message: errorMessage });
  }
}
