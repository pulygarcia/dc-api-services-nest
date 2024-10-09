import { Module } from '@nestjs/common';
import {servicesModule} from './services/services.module'

@Module({
  imports: [servicesModule]
})
export class AppModule {}
