import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

@Exclude()
export class UserResultDto {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public email: string;
}
