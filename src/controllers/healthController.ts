import { Request, Response } from 'express';

export const getApiStatus = (req: Request, res: Response) => {
  res.send('BrewNotes API is running!');
};
