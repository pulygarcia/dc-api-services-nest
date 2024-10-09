import { Module } from '@nestjs/common';
import { ServicesController } from '../services/services.controller'
import { StudioServicesServices } from './studio-services.services';

@Module({
  controllers: [ServicesController],
  providers: [StudioServicesServices],
})
export class servicesModule {}