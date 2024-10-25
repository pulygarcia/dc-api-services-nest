import { Controller, Post, Body,HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import {CreateAppointmentDto} from '../appointments/dto/create-appointment-dto'
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsServices: AppointmentsService){}

    @UseGuards(AuthGuard)
    @Post()
     async createAppointment(@Body() appointment:CreateAppointmentDto, @Req() req:any) {
        try {
            const created = await this.appointmentsServices.create(appointment, req.user);
            
            return {
              message: 'Appointment has been created successfully',
              data: created,
            };
          
          } catch (error) {
            console.log(error);
            throw new HttpException('Invalid data provided', HttpStatus.BAD_REQUEST);
          }
    }
}
