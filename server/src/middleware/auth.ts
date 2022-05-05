import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

const secret: string = process.env.SECRET || '';

interface JwtPayload {
  user: any;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-auth-token'];
  console.log('Hello', token);

  if (!token) res.status(401).json({ msg: 'No token!' });

  try {
    const decoded = jwt.verify(token as string, secret) as JwtPayload;
    req.user = decoded.user;
    next();
  } catch (err: any) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
