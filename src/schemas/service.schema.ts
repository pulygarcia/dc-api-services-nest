import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
  @Prop()
  serviceName: string;

  @Prop()
  pricePerHour: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);