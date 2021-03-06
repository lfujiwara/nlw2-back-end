import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class UpdateUserDto {
  id: number;

  @IsNotEmpty()
  firstName?: string;

  @IsNotEmpty()
  lastName?: string;

  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  @Length(10, 32)
  password?: string;

  @IsEmail()
  email?: string;
}
