import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class PatchPostsDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    type: Number,
    description: 'The ID of post that is supposed to be updated!',
    example: 1234,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
