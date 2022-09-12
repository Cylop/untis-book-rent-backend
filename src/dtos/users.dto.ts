import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { BaseDto } from './base.dto';

export class CreateUserDto extends BaseDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class LoginUserDto extends BaseDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UserResultDto extends BaseDto {
  @Expose() public id: number;
  @Expose() public name: string;
  @Expose() public email: string;
}
