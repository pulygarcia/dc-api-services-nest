import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from 'src/schemas/service.schema';
import { CreateServiceDto } from './dto/create-service-dto';
import { UpdateServiceDto } from './dto/update-service-dto';

@Injectable()
export class StudioServices {
  constructor(@InjectModel(Service.name) private serviceModel: Model<Service>) {}

  async create(createService: CreateServiceDto): Promise<Service> {
    const createdService = new this.serviceModel(createService);
    return createdService.save();
  }

  async getServices() {
    const services = await this.serviceModel.find().exec();
    return services;
  }

  async getById(id:string) {
    const serviceFound = await this.serviceModel.findById(id).exec();
    return serviceFound;
  }

  async updateService(id:string, data:UpdateServiceDto) {
    const service = await this.serviceModel.findById(id).exec();
    service.serviceName = data.serviceName || service.serviceName;
    service.pricePerHour = data.pricePerHour || service.pricePerHour;

    await service.save();

    return service;
  }
}