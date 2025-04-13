import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class getUsersParamDto {
  @IsOptional()
  @IsInt()
  //   It means when youb get the param, convert it to string
  @Type(() => Number)
  id?: number;
}
