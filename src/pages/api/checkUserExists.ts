import type { NextApiRequest, NextApiResponse } from 'next';
import { checkUserExists } from '@/utils/checkUserExists';

type Data = {
  status: number;
};

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  const { username } = req.query;

  if (typeof username !== 'string') {
    res.status(400).json({ message: 'Invalid request: userName should be a string.' });
    return;
  }

  try {
    const response = await checkUserExists(username);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    res.status(500).json({ message: errorMessage });
  }
}
