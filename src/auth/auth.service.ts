import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { User } from 'src/schemas/user.schema';
import { UserLoginDto } from '../users/dto/user-login-dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServices {
  constructor(
    private usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async registerUser(createUser: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: UserLoginDto): Promise<string> {
    try {
      const foundUser = await this.userModel.findOne({ email: user.email }).exec();
      if (!foundUser) {
        throw new HttpException(`User with email: ${user.email} not found`, HttpStatus.NOT_FOUND);
      }

      const isMatch = await bcrypt.compare(user.password, foundUser.password);
      if (!isMatch) {
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      }

      const payload = { sub: foundUser._id, email: foundUser.email };
      return await this.jwtService.signAsync(payload);
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
