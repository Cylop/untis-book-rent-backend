import { Request } from 'express';
import { BaseDto } from './base.dto';

export type ResponseStatus = 'OK' | 'ERROR';

export abstract class AbstractResponseContainer extends BaseDto {
  public path: string;
  public status: ResponseStatus;

  constructor(req: Request) {
    super();
    this.path = req.baseUrl + req.path;
  }
}

export class ResponseContainerDto<T> extends AbstractResponseContainer {
  public data: T;
  public message: string;

  constructor(req: Request, data: T, message?: string) {
    super(req);
    this.status = 'OK';
    this.data = data;
    this.message = message;
  }
}

export class PaginatedResponseContainerDto<T> extends ResponseContainerDto<T> {
  public pagination: PaginationResult;

  constructor(req: Request, pagination: Paginated<T>, message?: string) {
    super(req, pagination.data, message);

    const { count: reqCount, page: reqPage, pageSize } = pagination.paginationMeta;
    const page = Number(reqPage);
    const count = Number(reqCount);
    const lastPage = Math.ceil(count / pageSize);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    const totalPages = lastPage;
    this.pagination = {
      count: count as number,
      page: page,
      pageSize: pageSize as number,
      nextPage,
      prevPage,
      totalPages,
    };
  }
}

export class ErrorResponseContainerDto extends AbstractResponseContainer {
  public error: Error;

  constructor(req: Request, error: Error) {
    super(req);
    this.status = 'ERROR';
    this.error = error;
  }
}

export type PaginationResult = {
  count: number;
  pageSize: number;
  page: number;
  prevPage: number;
  nextPage: number;
  totalPages: number;
};

export type PaginationRequest = Pick<PaginationResult, 'page' | 'pageSize'> & {
  skip: number;
};

export interface PaginationMeta {
  page: number;
  pageSize: number;
  count: number;
}

export class Paginated<T> {
  data: T;
  paginationMeta: PaginationMeta;

  constructor(data: T, pagination: PaginationMeta) {
    this.data = data;
    this.paginationMeta = pagination;
  }
}
