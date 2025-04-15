import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { getUsersParamDto } from '../dto/get-users-param.dto';
import { UserDto } from '../dto/user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    //injecting usersRepositpry
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    //Check if user already exist with same email
    const existingUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto['email'],
      },
    });
    //Handle exception
    if (existingUser) {
      console.log(`${existingUser.email} has already exist`);
    }
    //Create new user
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }
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
