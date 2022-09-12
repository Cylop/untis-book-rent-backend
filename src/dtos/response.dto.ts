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

export class ErrorResponseContainerDto extends AbstractResponseContainer {
  public error: Error;

  constructor(req: Request, error: Error) {
    super(req);
    this.status = 'ERROR';
    this.error = error;
  }
}
