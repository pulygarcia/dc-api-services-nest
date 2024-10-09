import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import {StudioServicesServices} from '../services/studio-services.services'
import { Response } from 'express';
import { CreateServiceDto } from './dto/create-service-dto';

@Controller('services')
export class ServicesController {
    serviceServices : StudioServicesServices
    constructor(serviceServices:StudioServicesServices){
        this.serviceServices = serviceServices;
    }

  @Get()
  findAll() {
    return this.serviceServices.findAll();
  }

  @Post()
  createService(@Body() service:CreateServiceDto, @Res() res:Response) {
    this.serviceServices.create(service);
    return res.status(201).json({msg:'Created successfully'})
  }
}