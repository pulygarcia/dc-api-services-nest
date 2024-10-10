import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2) 
    serviceName: string;

    @IsNotEmpty()
    @IsNumber()
    pricePerHour: number;
}