import { IsNotEmpty, IsNumber, IsString, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2) 
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @MinLength(5) 
    email: string;

    @IsNotEmpty()
    @MinLength(8) 
    password: string;
}