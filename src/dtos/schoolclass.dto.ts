import { Expose } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import { BaseDto } from './base.dto';

export class CreateSchoolClassDto extends BaseDto {
  @IsString()
  public name: string;

  @IsString()
  public label: string;

  @IsNumber({ maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false })
  @Max(9999)
  @Min(0)
  public studentCount: number;
}

export class SchoolClassResultDto extends BaseDto {
  @Expose() public name: string;
  @Expose() public label: string;
  @Expose() public studentCount: number;
}
