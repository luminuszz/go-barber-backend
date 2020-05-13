/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';

export default function globalError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): any {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
