import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostsDto } from './dto/patch-post.dto';

@Controller('posts')
//setting collabsable name for swagger by ApiTags
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  /**
   * title string
   * postType enum ["post,page,story,series"]
   * slug:string
   * status:enum["drafted,scheduled,review,published"]
   * content?:Lstring
   * schema?:string
   * featuredImageUrl?:string
   * publishOn:Date
   * tags:string[]
   * metaOptions:[{key:value}]
   */

  @Post()
  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if you post is created successfully!',
  })
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return 'You have created';
  }

  @ApiOperation({
    summary: 'This api endpoint updates an exisitn gblog post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if everything goes well',
  })
  @Patch('')
  public updatePost(@Body() patchPostsDto: PatchPostsDto) {
    console.log(patchPostsDto);
    return 'Update post';
  }
}
