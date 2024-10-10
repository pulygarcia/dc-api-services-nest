import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateServiceDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2) 
    @IsOptional()
    serviceName?: string;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    pricePerHour?: number;
}