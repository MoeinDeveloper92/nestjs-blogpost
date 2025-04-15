import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    type: String,
    description: 'This is the title for the Blog post.',
    example: 'test title',
    required: true,
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: postType,
    description: 'Possible values:"post","stories","series","page ',
    required: true,
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    type: String,
    required: true,
    description: 'For Example: this-is-slug',
  })
  @IsString()
  @IsNotEmpty()
  //my-url
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and usess only "-" and wihtoght hyohen. for example my-url"',
  })
  slug: string;

  @ApiProperty({
    enum: postStatus,
    description: "possible values:'draft','scheduled'",
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    description: 'This is the content of the post',
    example: 'test content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialized your json object ekse a validation error will be thorwn',
    example:
      '{\r\n"@context":"https:\/\/schema.org",\r\n "@type":"Person"\r\n}',
  })
  @IsString()
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image for blog post',
    example: 'http://localhost.com/images',
  })
  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The date on which the blog post is published!',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tags passed as string valuess',
    example: ['nestjs'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  //   Each values for length is teste to make sure atlest is 3
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'The key can be any string identifier for meta options',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value that you want to save to the key',
          example: true,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  //first it matches the ioncomming request to this particulart dto and create an instance of particular mentioned dto, and second the incoming object should container these properties
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
