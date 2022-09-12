import { Expose } from 'class-transformer';
import { BaseDto } from './base.dto';

export class TimeStampDto extends BaseDto {
  @Expose() public createdAt: Date;
  @Expose() public updatedAt: Date;
}
