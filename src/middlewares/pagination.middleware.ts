import { PaginationQueryParams } from '@/dtos/general.dto';
import { Request, RequestHandler } from 'express';

const paginationMiddleware: RequestHandler = (req: Request, res, next) => {
  const { page: reqPage = 1, pageSize: reqPageSize = 25 }: PaginationQueryParams = req.query as PaginationQueryParams;
  const page = Number(reqPage);
  const pageSize = Number(reqPageSize);
  const skip = (page - 1) * pageSize;
  req.pagination = {
    page,
    pageSize,
    skip,
  };
  next();
};

export default paginationMiddleware;
