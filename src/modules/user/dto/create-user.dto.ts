import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class CreateUserDto {

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
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'gender must be either male or female',
    })
    gender: string;
}
