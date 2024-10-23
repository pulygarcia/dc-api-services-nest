import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    return await this.usersService.create(createUser);
  }

  async login(user: UserLoginDto): Promise<string> {
    const foundUser = await this.userModel.findOne({ email: user.email }).exec();
    if (!foundUser) {
      throw new HttpException(`User with email: ${user.email} not found`, HttpStatus.NOT_FOUND);
    }

    
    const isMatch = await bcrypt.compare(user.password, foundUser.password);
    if (!isMatch) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    //jwt
    const payload = { sub: foundUser._id, email: foundUser.email };

    return  await this.jwtService.signAsync(payload);
    
  }
}
