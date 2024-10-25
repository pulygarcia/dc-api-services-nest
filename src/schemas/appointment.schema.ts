import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose'

export type ServiceDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }] })
  selectedServices: mongoose.Schema.Types.ObjectId[];

  @Prop()
  selectedDate: Date;
  
  @Prop()
  selectedHour: string;
  
  @Prop()
  user: mongoose.Schema.Types.ObjectId;

  @Prop()
  totalToPay: number;

}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);