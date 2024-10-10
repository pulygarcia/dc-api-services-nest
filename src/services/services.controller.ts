import { Controller, Get, Post, Req, Res, Body, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import {StudioServices} from '../services/studio-services.services'
import { CreateServiceDto } from './dto/create-service-dto';
import { UpdateServiceDto } from './dto/update-service-dto';

@Controller('services')
export class ServicesController {
  studioServices : StudioServices
  constructor(studioServices:StudioServices){
      this.studioServices = studioServices;
  }

  @Post()
  async createService(@Body() service:CreateServiceDto) {
    try {
      const created = await this.studioServices.create(service);
      
      return {
        message: 'Service has been created successfully',
        data: created,
      };
    
    } catch (error) {
      throw new HttpException('Invalid data provided', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getServices() {
    try {
      return await this.studioServices.getServices();
    
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    try {
      return await this.studioServices.getById(id);
    
    } catch (error) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put('/:id')
  async updateService(@Param('id') id: string, @Body() updatedService:UpdateServiceDto) {
    try {
      const updated = await this.studioServices.updateService(id, updatedService);
    
      return {
        message: 'Service updated successfully',
        data: updated,
      };
    
    } catch (error) {
      throw new HttpException('Invalid data provided', HttpStatus.BAD_REQUEST);
    }
  }
}