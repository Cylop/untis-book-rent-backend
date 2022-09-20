import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { ErrorResponseContainerDto } from '@/dtos/response.dto';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error?.status ?? 500;
    const message: string = error?.message ?? 'Something went wrong';

    error = { ...error, status, message };

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

    res.status(status).json(new ErrorResponseContainerDto(req, error));
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
