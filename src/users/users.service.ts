import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        id: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        id: 3,
        username: 'lucas',
        password: 'guess',
      },
    ];
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOneById(userId: number): Promise<User | undefined> {
    return this.users.find(user => user.id === userId);
  }
}
