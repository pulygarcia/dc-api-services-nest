import { Controller, Get, Post, Param, Put, Body } from '@nestjs/common';
import { StudioServices } from '../services/studio-services.services';
import { CreateServiceDto } from './dto/create-service-dto';
import { UpdateServiceDto } from './dto/update-service-dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly studioServices: StudioServices) {}

  @Post()
  async createService(@Body() service: CreateServiceDto) {
    const created = await this.studioServices.create(service);
    return {
      message: 'Service has been created successfully',
      data: created,
    };
  }

  @Get()
  async getServices() {
    return await this.studioServices.getServices();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.studioServices.getById(id);
  }

  @Put('/:id')
  async updateService(@Param('id') id: string, @Body() updatedService: UpdateServiceDto) {
    const updated = await this.studioServices.updateService(id, updatedService);
    return {
      message: 'Service updated successfully',
      data: updated,
    };
  }
}
