import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  Patch,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { getUsersParamDto } from './dto/get-users-param.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UsersService } from './providers/users.service';
//http://localhost:3000/users

@Controller('users')
export class UsersController {
  /**
   *
   * Final Endpoints - /users/id?limit=10&page=1
   * Param id - optional, convert to integer, cannot have a default value
   * Query limit - integer - default 10
   * Query page - integer default 1
   * ==> USE CASES
   * /users/ ==> return all users with default pagination
   * /users/123 => return one user whose id is 123
   * /users?limit=10&page-2 = > return page 2 with limit of pagiantion 10
   */
  constructor(
    //Injecting user service to user controller
    private readonly userService: UsersService,
  ) {}
  @Get('/:id?')
  public getUsers(
    @Param() getUsersParamDto: getUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(getUsersParamDto, limit, page);
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto instanceof CreateUserDto);
    return 'You sent a post request to users endpoint';
  }

  @Put('/:id')
  public updateUsers(@Param('id') id: string) {
    return `You sent a put request to users id ${id} endpoint`;
  }

  @Delete('/:id')
  public deleteUsers(@Param('id') id: string) {
    return `You send a delete request to uesers id:${id} `;
  }

  @Patch()
  public pathUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return patchUserDto;
  }
}
