import { Expose } from 'class-transformer';
import { IsISBN, IsNumber, Max, Min } from 'class-validator';
import { BaseDto } from './base.dto';
import { UserResultDto } from './users.dto';

export class CreateBookDto extends BaseDto {
  @IsISBN()
  public isbn: string;

  @IsNumber()
  public createdBy: number;
}

export class UpdateBookDto extends BaseDto {
  @IsNumber()
  @Min(0)
  @Max(999_999)
  public amount: number;
}

export class BookResultDto extends BaseDto {
  @Expose() public id: string;
  @Expose() public isbn10: string;
  @Expose() public isbn13: string;
  @Expose() public title: string;
  @Expose() public titleLong: string;
  @Expose() public imageUrl: string;
  @Expose() public publisher: string;
  @Expose() public publishingDate: Date;
  @Expose() public pages: number;
  @Expose() public binding: string;
  @Expose() public authors: string[];
  @Expose() public createdBy: UserResultDto;
  @Expose() public amount: number;
}
