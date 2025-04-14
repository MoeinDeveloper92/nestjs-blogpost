import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  public login(email: string, password: string, id: string) {
    //Check if the user exist in the db
    const user = this.userService.findUserById('1234');
    //login
    //return token
    return 'lkml123123lk12lk3';
  }

  public isAuth() {
    return true;
  }
}
