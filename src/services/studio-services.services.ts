import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from 'src/schemas/service.schema';
import { CreateServiceDto } from './dto/create-service-dto';
import { UpdateServiceDto } from './dto/update-service-dto';

@Injectable()
export class StudioServices {
  constructor(@InjectModel(Service.name) private serviceModel: Model<Service>) {}

  async create(createService: CreateServiceDto): Promise<Service> {
    try {
      const createdService = new this.serviceModel(createService);
      return await createdService.save();
    } catch (error) {
      throw new HttpException('Invalid data provided', HttpStatus.BAD_REQUEST);
    }
  }

  async getServices() {
    try {
      return await this.serviceModel.find().exec();
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string) {
    try {
      const serviceFound = await this.serviceModel.findById(id).exec();
      if (!serviceFound) {
        throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
      }
      return serviceFound;
    } catch (error) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateService(id: string, data: UpdateServiceDto) {
    try {
      const service = await this.serviceModel.findById(id).exec();
      if (!service) {
        throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
      }
      
      service.serviceName = data.serviceName || service.serviceName;
      service.pricePerHour = data.pricePerHour || service.pricePerHour;
      await service.save();

      return service;
    } catch (error) {
      throw new HttpException('Invalid data provided', HttpStatus.BAD_REQUEST);
    }
  }
}
