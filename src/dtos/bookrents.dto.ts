import { Book } from '@/interfaces/books.interface';
import { SchoolClass } from '@/interfaces/schoolclass.interface';
import { User } from '@/interfaces/users.interface';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { BaseDto } from './base.dto';

export enum RentStatus {
  rented = 'rented',
  canceled = 'canceled',
  done = 'done',
}

export class CreateBookRentDto extends BaseDto {
  @IsString()
  public bookId: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @Max(999_999)
  public amount: number;

  @IsNumber()
  public classNum: number;

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

export class BookRentResultDto extends BaseDto {
  @Expose() public id: string;
  @Expose() public status: RentStatus;
  @Expose() public amount: number;
  @Expose() public classNum: SchoolClass;
  @Expose() public rentedBy: User;
  @Expose() public book: Book;
}
