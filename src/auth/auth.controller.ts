import {
  Controller,
  Request,
  Response,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  async status() {
    return;
  }
}
