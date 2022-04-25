import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Collection, User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async update(userId: number, data: UpdateUserDto): Promise<User> {
        try {
            const {email, password, name} = data;
            const hashPassword = await bcrypt.hash(password, 10);

            const user = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    email,
                    passWord: hashPassword,
                    name
                },
            });

            delete user.passWord;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getCollection(userId: number): Promise<Collection[]> {
        try {
            const collections = await this.prisma.collection.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    tasks: true,
                },
            });
            return collections;
        } catch (error) {
            throw error;
        }
    }
}
