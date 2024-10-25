import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from 'src/schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment-dto';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    ){}

    async create(appointment: CreateAppointmentDto, user: any) {
        try {
            const createdAppointment = new this.appointmentModel(appointment);
            createdAppointment.user = user.sub;
            await createdAppointment.save();
            
            return createdAppointment;
            
        } catch (error) {
            //Specific errors here if necessary
            throw new BadRequestException('Invalid data provided');
        }
    }

    async getByID(id: string) {
        const appointment = await this.appointmentModel.findById(id);
        if (!appointment) {
            throw new NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }
}
