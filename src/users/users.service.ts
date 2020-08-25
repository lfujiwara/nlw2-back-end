import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { User } from './models/user.entity';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UpdateUserDto } from './models/dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async checkEmailAvailability(email: string) {
    return (await this.usersRepository.count({ email })) === 0;
  }

  async checkUsernameAvailability(username: string) {
    return (await this.usersRepository.count({ username })) === 0;
  }

  async create(data: CreateUserDto) {
    if (
      !(await this.checkEmailAvailability(data.email)) ||
      !(await this.checkUsernameAvailability(data.username))
    ) {
      throw new ConflictException(
        {
          statusCode: 409,
          message: 'Username or email already exists',
        },
        'Username or email already exists',
      );
    }
    return this.usersRepository.save({
      ...data,
      password: await hash(data.password, 8),
    });
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  findOneById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  update(data: UpdateUserDto) {
    return this.usersRepository.update({ id: data.id }, data);
  }

  async delete(id: number) {
    if ((await this.usersRepository.count({ where: { id } })) === 0) {
      throw new NotFoundException();
    }
    return this.usersRepository.delete({ id });
  }
}
