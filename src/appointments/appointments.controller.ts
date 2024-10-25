import { Controller, Post, Get, Body, UseGuards, Req, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createAppointment(@Body() appointment: CreateAppointmentDto, @Req() req: any) {
        const created = await this.appointmentsService.create(appointment, req.user);
        return {
            message: 'Appointment has been created successfully',
            data: created,
        };
    }

    @Get(':id')
    async getAppointmentById(@Param('id') id: string) {
        const appointment = await this.appointmentsService.getByID(id);
        return { data: appointment };
    }
}
