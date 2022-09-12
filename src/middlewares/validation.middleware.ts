import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { ValidationException } from '@/exceptions/ValidationException';
import { OmitStrict } from '@/shared/types/general.types';

type ProperValidationError = OmitStrict<ValidationError, 'target' | 'toString'>;

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
      validationError: {
        target: false,
      },
    }).then((errors: ProperValidationError[]) => {
      if (errors.length > 0) {
        next(new ValidationException(400, 'Error in Validation', errors));
        return;
      }
      next();
    });
  };
};

export default validationMiddleware;
