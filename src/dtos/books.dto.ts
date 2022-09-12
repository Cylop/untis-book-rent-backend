import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsISBN, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { BaseDto } from './base.dto';
import { UserResultDto } from './users.dto';

export class CreateBookDto implements BaseDto {
  @IsISBN()
  public isbn: string;

  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsUrl()
  public imageUrl: string;

  @IsString()
  public publisher: string;

  @IsOptional()
  @IsDate()
  public publishingDate: Date;

  @IsNumber()
  public createdBy: number;
}

@Exclude()
export class BookResultDto implements BaseDto {
  @Expose()
  public isbn: string;
  @Expose()
  public title: string;
  @Expose()
  public description: string;
  @Expose()
  public imageUrl: string;
  @Expose()
  public publisher: string;
  @Expose()
  public publishingDate: Date;
  @Expose()
  public createdBy: UserResultDto;
}
