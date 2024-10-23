import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2) 
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @MinLength(5) 
    email: string;

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @MinLength(8) 
    password: string;
}