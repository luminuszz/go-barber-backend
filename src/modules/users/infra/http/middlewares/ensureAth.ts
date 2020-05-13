import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@Config/authConfig';
import AppError from '@shared/errors/AppError';

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
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, name } = decoded as DataToken;

    request.user = {
      id: sub,
      name,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
