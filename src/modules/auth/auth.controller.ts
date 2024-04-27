import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //@UseGuards(AuthGuard('local'))
    @Post('login')
    //TODO: Actualmente se está haciendo el login por email como username
    // no como el username real, cambiar esa parte => email por username
    async login(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.login(loginUserDto);
    }

    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: CreateUserDto) {
        return await this.authService.create(user);
    }
}
