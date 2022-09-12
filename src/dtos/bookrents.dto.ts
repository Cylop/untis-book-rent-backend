import { SchoolClass } from '@/interfaces/schoolclass.interface';
import { User } from '@/interfaces/users.interface';
import { Expose } from 'class-transformer';
import { IsEnum, IsISBN, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { BaseDto } from './base.dto';

export enum RentStatus {
  rented = 'rented',
  canceled = 'canceled',
  done = 'done',
}

export class CreateBookRentDto extends BaseDto {
  @IsISBN()
  public isbn: string;

  @IsNumber()
  public classNum: number;

  @IsEnum(RentStatus)
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

export class UpdateBookRentDto extends BaseDto {
  @IsOptional()
  @IsString()
  @IsEnum(RentStatus)
  public status: RentStatus;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @Max(999_999)
  public amount: number;
}

export class DeleteBookRentDto extends BaseDto {
  @IsISBN()
  public isbn: string;

  @IsNumber()
  public classNum: number;
}

export class BookRentResultDto extends BaseDto {
  @Expose() public isbn: string;
  @Expose() public classNum: SchoolClass;
  @Expose() public status: RentStatus;
  @Expose() public amount: number;
  @Expose() public rentedBy: User;
}
