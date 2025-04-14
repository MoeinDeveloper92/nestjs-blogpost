import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsEmail()
  email: string;
}
