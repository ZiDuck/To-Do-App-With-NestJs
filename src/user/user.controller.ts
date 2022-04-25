import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { Collection, User } from '@prisma/client';
import { UpdateUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    // [GET] users/me
    @Get('me')
    findOne(@GetUser() user: User): User {
        return user;
    }

    // [PUT] users/me
    @Put('me')
    update(@GetUser() user: User, @Body() data: UpdateUserDto): Promise<User> {
        return this.userService.update(user.id, data);
    }

    // [GET] users/me/collections/
    @Get('me/collections')
    getCollection(@GetUser() user: User): Promise<Collection[]> {
        return this.userService.getCollection(user.id);
    }
}
