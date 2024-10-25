import { Controller, Get, Post, Request, Body, UseGuards } from '@nestjs/common';
import { AuthServices } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { UserLoginDto } from '../users/dto/user-login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthServices) {}

  @Post('/register')
  async registerUser(@Body() user: CreateUserDto) {
    const created = await this.authServices.registerUser(user);
    return {
      message: 'User has been created successfully',
      data: created,
    };
  }

  @Post('/login')
  async login(@Body() user: UserLoginDto) {
    const loggedUser = await this.authServices.login(user);
    return {
      message: 'Logged correctly',
      data: loggedUser,
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
