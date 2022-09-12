import { ValidationError } from 'class-validator';
import { HttpException } from './HttpException';

export class ValidationException extends HttpException {
  public validation: ValidationError[];

  constructor(status: number, message: string, validation: ValidationError[]) {
    super(status, message);
    this.validation = validation;
  }
}
