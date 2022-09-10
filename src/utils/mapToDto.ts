import { plainToInstance, instanceToPlain } from 'class-transformer';
import { isEmpty } from './util';

type Constructor = new (...args: any) => any;

export const mapToDto = <Y, T extends Constructor>(value: Y | Y[], resultDto: T): T | Array<T> => {
  if (isEmpty(value) || !resultDto) throw new Error('Value and resultDto must be defined');
  if (Array.isArray(value)) return value.map(e => mapSingle(e, resultDto));
  return mapSingle(value, resultDto);
};

const mapSingle = <Y, T extends Constructor>(value: Y, resultDto: T): T =>
  plainToInstance(resultDto, instanceToPlain(value), { excludeExtraneousValues: true }) as T;
