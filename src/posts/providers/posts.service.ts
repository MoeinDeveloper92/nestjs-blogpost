import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly userService: UsersService) {}
  public findAll(userId: string) {
    //Users Service
    const user = this.userService.findUserById(userId);
    //Find User

    //REturn User

    return [
      { user, title: 'Test title', content: 'Test Contet' },
      { user, title: 'test title2', content: 'Test Content 2' },
    ];
  }
}
