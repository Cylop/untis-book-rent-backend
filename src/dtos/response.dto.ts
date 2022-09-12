import { Expose } from 'class-transformer';
import { Request } from 'express';
import { BaseDto } from './base.dto';

export type ResponseStatus = 'OK' | 'ERROR';

export abstract class AbstractResponseContainer {
  public path: string;
  public status: ResponseStatus;

  constructor(req: Request) {
    this.path = req.path;
  }
}

@Expose()
export class ResponseContainerDto<T> extends AbstractResponseContainer implements BaseDto {
  public data: T;
  public message: string;

  constructor(req: Request, data: T, message?: string) {
    super(req);
    this.status = 'OK';
    this.data = data;
    this.message = message;
  }
}

@Expose()
export class ErrorResponseContainerDto extends AbstractResponseContainer implements BaseDto {
  public error: Error;

  constructor(req: Request, error: Error) {
    super(req);
    this.status = 'ERROR';
    this.error = error;
  }
}
