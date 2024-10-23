import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Import user schema
  ],
  providers: [UsersService],
  exports: [UsersService], // If u need to use usersServices in other module, make sure to export
})
export class UsersModule {}
