import { BaseDto } from './base.dto';

export class TimeStampDto implements BaseDto {
  public createdAt: Date;
  public updatedAt: Date;
}
