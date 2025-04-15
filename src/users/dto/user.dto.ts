import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    type: String,
    example: 'testUser',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'test@gmail.com',
  })
  @IsEmail()
  email: string;
}
