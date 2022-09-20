import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { BaseDto } from './base.dto';
import { Query } from 'express-serve-static-core';

export class TimeStampDto extends BaseDto {
  @Expose() public createdAt: Date;
  @Expose() public updatedAt: Date;
}

export class PaginationQueryParams implements Query {
  [key: string]: string | any | import('qs').ParsedQs | string[] | import('qs').ParsedQs[];
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @Max(400)
  @Type(() => Number)
  page = 1;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @Max(400)
  @Type(() => Number)
  pageSize = 25;
}
