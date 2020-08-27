import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param() params: { id: number }) {
    await this.usersService.delete(params.id);
    return;
  }

  @Get('check-username/:username')
  async checkUsername(@Param() params: { username: string }) {
    if (!(await this.usersService.checkUsernameAvailability(params.username))) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Username already exists',
      });
    }
  }

  @Get('check-email/:email')
  async checkEmail(@Param() params: { email: string }) {
    if (!(await this.usersService.checkEmailAvailability(params.email))) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Email already registered',
      });
    }
  }
}
