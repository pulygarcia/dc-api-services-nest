import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2) 
    serviceName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2) 
    artist: string;
}