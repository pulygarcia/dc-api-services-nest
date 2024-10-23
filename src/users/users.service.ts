import { Injectable, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../users/dto/create-user-dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ){}

    async create(createUserDto: CreateUserDto){ 
        // already exists?
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (existingUser) {
          throw new ConflictException('User with this email already exists');
        }

        const createdUser = new this.userModel(createUserDto);
        await createdUser.save();

        return this.userModel.findById(createdUser._id).select('-password').exec(); //send it excluding psswd
    }

    async findOne(userId: string): Promise<User | undefined> {
        return await this.userModel.findById(userId);
    }
}
