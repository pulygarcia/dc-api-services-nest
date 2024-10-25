import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsArray()
    selectedServices: string[];

    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    selectedDate: Date;

    @IsNotEmpty()
    @IsString()
    selectedHour: string;

    @IsNotEmpty()
    user: string;
    
    @IsNotEmpty()
    @IsNumber()
    totalToPay: number;
}