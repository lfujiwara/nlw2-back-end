import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === password) {
      const result = { ...user };
      delete result.password;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return {
      token: this.jwtService.sign({ username: user.username, id: user.id }),
    };
  }
}
