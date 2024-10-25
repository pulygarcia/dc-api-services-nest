import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from 'src/schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment-dto';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    ){}

    async create(appointment:CreateAppointmentDto, user: any){
        const createdAppointment = new this.appointmentModel(appointment);
        createdAppointment.user = user.sub;

        await createdAppointment.save();

        return createdAppointment;
    }
}
