import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    type: String,
    example: 'testUser',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Last name',
    example: 'testUser',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'test@gmail.com',
  })
  @MaxLength(96)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '1234@qwerTT',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message:
      'password should contain at least one letter, one number and one special characters',
  })
  password: string;
}
