import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
export declare const authMiddleware: (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
