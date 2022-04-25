import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { AuthDto, CreateUserDto } from './dto';
import { JwtGuard } from './guard';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() data: CreateUserDto): Promise<User> {
        return this.authService.register(data);
    }

    @Post('login')
    login(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.login(dto);
    }

    @UseGuards(JwtGuard)
    @Post('refresh-token')
    refreshToken(@GetUser() user: User): Promise<Tokens> {
        return this.authService.refreshToken(user);
    }
}
