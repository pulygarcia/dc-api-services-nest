import { Model } from 'mongoose';
import { Injectable, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from 'src/schemas/user.schema';
import { UserLoginDto } from './dto/user-login-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServices {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, 
    private jwtService: JwtService
  ) {}

  async registerUser(createUser: CreateUserDto): Promise<User> {
    // already exists?
    const existingUser = await this.userModel.findOne({ email: createUser.email }).exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async login(user: UserLoginDto): Promise<string> {
    const foundUser = await this.userModel.findOne({ email: user.email }).exec();
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    
    const isMatch = await bcrypt.compare(user.password, foundUser.password);
    if (!isMatch) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    //jwt
    const payload = { sub: foundUser._id, email: foundUser.email };

    return  await this.jwtService.signAsync(payload);
    
  }
}
