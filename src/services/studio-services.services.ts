import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service-dto';

@Injectable()
export class StudioServicesServices {
  private readonly services: CreateServiceDto[] = [{serviceName: 'tattoo', artist:'daniboy'}];

  create(service: CreateServiceDto) {
    this.services.push(service);
  }

  findAll(): CreateServiceDto[] {
    return this.services;
  }
}