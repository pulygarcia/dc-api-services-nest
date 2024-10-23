import { Controller, Get, Post, Req, Res, Body, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import {AuthServices} from './auth.service'
import { CreateUserDto } from '../users/dto/create-user-dto';
import { UserLoginDto } from '../users/dto/user-login-dto';

@Controller('auth')
export class AuthController {
  authServices : AuthServices
  constructor(authServices:AuthServices){
    this.authServices = authServices;
}

  @Post('/register')
  async registerUser(@Body() user:CreateUserDto) {
    try {
      const created = await this.authServices.registerUser(user);
      
      return {
        message: 'User has been created successfully',
        data: created,
      };
    
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/login')
  async login(@Body() user:UserLoginDto) {
    try {
      const loggedUser = await this.authServices.login(user);
      
      return {
        message: 'Logged correctly',
        data: loggedUser,
      };
    
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
