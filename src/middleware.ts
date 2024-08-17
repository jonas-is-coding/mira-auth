// src/middleware.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

const secret = process.env.MIRA_SECRET || 'default_secret';

export const authMiddleware = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Auth token missing' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};