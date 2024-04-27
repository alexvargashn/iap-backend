import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Gender } from "../enum/gender.enum";


export class UserDto {

    @IsString()
    id?: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password?: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either male or female',
    })
    gender: string;

    @IsString()
    @IsOptional()
    createdAt?: string

    @IsString()
    @IsOptional()
    updatedAt?: string
}