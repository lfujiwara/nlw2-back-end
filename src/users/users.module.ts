import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './models/user.entity';
import { UsersController } from './users.controller';
import { WeeklyTimeWindow } from './models/weekly-time-window.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, WeeklyTimeWindow])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
