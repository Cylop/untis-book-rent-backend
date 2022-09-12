import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { BaseDto } from './base.dto';

export class CreateUserDto implements BaseDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class LoginUserDto implements BaseDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

@Exclude()
export class UserResultDto implements BaseDto {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public email: string;
}
