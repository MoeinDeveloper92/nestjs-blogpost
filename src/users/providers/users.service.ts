import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { getUsersParamDto } from '../dto/get-users-param.dto';
import { UserDto } from '../dto/user.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public findAll(
    getUsersParamsDto: getUsersParamDto,
    limit: number,
    page: number,
  ): UserDto[] {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    if (isAuth) {
      return [
        { firstName: 'John', email: 'john@gmail.com' },
        { firstName: 'Alice', email: 'Alice@gmail.com' },
      ];
    }
  }

  // find a user by it's id
  public findUserById(id: string): UserDto {
    return {
      firstName: 'john',
      email: 'john@gmail.com',
    };
  }
}
