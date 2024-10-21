import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesController } from '../services/services.controller'
import { StudioServices } from './studio-services.services';
import { Service, ServiceSchema } from '../schemas/service.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }])],
  controllers: [ServicesController],
  providers: [StudioServices],
})
export class ServicesModule {}