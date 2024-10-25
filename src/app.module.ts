import { Module } from '@nestjs/common';
import {ServicesModule} from './services/services.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // allow config module in all the app
    }),
    MongooseModule.forRoot(process.env.MONGO_URI), 
    ServicesModule, 
    AuthModule, 
    UsersModule, 
    AppointmentsModule
  ]
})
export class AppModule {}
