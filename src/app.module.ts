import { Module } from '@nestjs/common';
import {servicesModule} from './services/services.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // allow config module in all the app
    }),
    MongooseModule.forRoot(process.env.MONGO_URI), 
    servicesModule
  ]
})
export class AppModule {}
