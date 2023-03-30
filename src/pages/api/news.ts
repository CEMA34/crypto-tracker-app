import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1723b4e8b06b45d698d53d875918ac6e');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching news data' });
  }
}