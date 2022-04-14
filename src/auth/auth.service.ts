import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from '@prisma/client';
import { Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    async register(createUserDto: CreateUserDto): Promise<User> {
        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            console.log(createUserDto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: createUserDto.email,
                    passWord: hashedPassword,
                    name: createUserDto.name,
                },
            });

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    async login(authDto: AuthDto): Promise<Tokens> {
        // find user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: authDto.email,
            },
        });

        if (!user) {
            console.log('User not found');
            throw new ForbiddenException('Credential incorrect');
        }

        const pwMatches = await bcrypt.compare(authDto.password, user.passWord);
        if (!pwMatches) {
            console.log('Password incorrect');
            throw new ForbiddenException('Credential incorrect');
        }
        return this.signToken(user.id, user.email);
    }

    async refreshToken(user: User): Promise<Tokens> {
        const token = this.signToken(user.id, user.email);
        return token;
    }

    async signToken(userId: number, email: string): Promise<Tokens> {
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET');

        const access_token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });

        const refresh_token = await this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret: secret,
        });

        return {
            access_token,
            refresh_token,
        };
    }
}
