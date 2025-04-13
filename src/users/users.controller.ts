import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { getUsersParamDto } from './dto/get-users-param.dto';
import { PatchUserDto } from './dto/patch-user.dto';

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
  @Get('/:id?')
  public getUsers(
    @Param() getUsersParamDto: getUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(getUsersParamDto);
    return 'You Sent a get request to users endpoint';
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
