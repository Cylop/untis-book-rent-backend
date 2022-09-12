import { Expose } from 'class-transformer';
import { IsISBN, IsNumber, Max, Min } from 'class-validator';
import { BaseDto } from './base.dto';

export class CreateBookInventoryDto extends BaseDto {
  @IsISBN()
  public isbn: string;

  @IsNumber()
  @Min(0)
  @Max(9_999_999)
  public amount: number;
}

export class BookInventoryResultDto extends BaseDto {
  @Expose() public isbn: string;
  @Expose() public amount: number;
}
