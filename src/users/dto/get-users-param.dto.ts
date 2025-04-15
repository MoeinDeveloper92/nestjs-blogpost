import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class getUsersParamDto {
  @ApiPropertyOptional({
    required: false,
    type: Number,
    description: 'Get user with sepcific ID',
    example: 1234,
  })
  @IsOptional()
  @IsInt()
  //   It means when youb get the param, convert it to string
  @Type(() => Number)
  id?: number;
}
