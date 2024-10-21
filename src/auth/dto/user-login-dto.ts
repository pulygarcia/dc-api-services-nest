import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserLoginDto {
    @IsEmail()
    @IsNotEmpty()
    @MinLength(5) 
    email: string;

    @IsNotEmpty()
    @MinLength(8) 
    password: string;
}