import { SchoolClass } from '@/interfaces/schoolclass.interface';
import { User } from '@/interfaces/users.interface';
import { Expose } from 'class-transformer';
import { IsIn, IsISBN, IsNumber, IsString, Max, Min } from 'class-validator';
import { BaseDto } from './base.dto';

/*

  isbn varchar [pk, ref: > books.isbn]
  class integer [pk, ref: > classes.id]
  status rent_status
  amount integer
  rented_by intger [ref: > users.id]
*/

export const rentStatus = ['rented', 'canceled', 'done'] as const;
export type RentStatus = typeof rentStatus[number];

export class CreateBookRentDto extends BaseDto {
  @IsISBN()
  public isbn: string;

  @IsString()
  public class: number;

  @IsString()
  @IsIn(rentStatus)
  public status: RentStatus;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @Max(999_999)
  public amount: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @Max(999_999)
  public rentedBy: number;
}

export class BookRentResultDto extends BaseDto {
  @Expose() public isbn: string;
  @Expose() public class: SchoolClass;
  @Expose() public status: RentStatus;
  @Expose() public amount: number;
  @Expose() public rentedBy: User;
}
