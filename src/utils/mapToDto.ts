import { BaseDto } from '@/dtos/base.dto';
import { Newable } from '@/shared/types/general.types';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { BaseEntity } from 'typeorm';
import { isEmpty } from './util';

export type ChildrenMapper<T extends BaseDto | BaseEntity> = { field: keyof T; dto: Newable<BaseDto> };
export type MultipleChildrenMapper<T> = ChildrenMapper<T>[];

export function mapToDto<Y, T extends BaseDto | BaseEntity>(
  value: Y | Y[],
  resultDto: Newable<T>,
  childrenMapper?: MultipleChildrenMapper<T>,
): T | T[] {
  if (isEmpty(value) || !resultDto) throw new Error('Value and resultDto must be defined');
  if (!Array.isArray(value)) return mapSingle(value, resultDto, childrenMapper);
  return value.map(e => mapSingle(e, resultDto, childrenMapper));
}

const mapSingle = <Y, T extends BaseDto | BaseEntity>(value: Y, resultDto: Newable<T>, childrenMapper?: MultipleChildrenMapper<T>): T => {
  let result = plainToInstance(resultDto, instanceToPlain(value), { excludeExtraneousValues: true }) as T;
  if (!childrenMapper) return result;

  for (let i = 0; i < childrenMapper.length; i++) {
    const mapper = childrenMapper[i];
    const fieldValue = result[mapper.field];
    const mappedValue = plainToInstance(mapper.dto, instanceToPlain(fieldValue), {
      excludeExtraneousValues: true,
    }) as typeof mapper.dto;
    result = { ...result, [mapper.field]: mappedValue };
  }
  return result;
};
