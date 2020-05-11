import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/authConfig';

interface DataToken {
  name: string;
  iat: string;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    console.log(decoded);

    const { sub, name } = decoded as DataToken;

    request.user = {
      id: sub,
      name,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
