import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ExsistingUserDTO } from 'src/users/dtos/existing-user.dto';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { UserDetails } from 'src/users/user-details.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | null | string> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  login(@Body() user: ExsistingUserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }
}
