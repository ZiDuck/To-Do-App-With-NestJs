import { Injectable } from '@nestjs/common';
import { Collection, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionDto, UpdateCollectionDto } from './dto';
@Injectable()
export class CollectionService {
    constructor(private prisma: PrismaService) {}

    async store(userId: number, data: CreateCollectionDto): Promise<Collection> {
        try {
            const collection = await this.prisma.collection.create({
                data: {
                    ...data,
                    userId,
                },
            });
            return collection;
        } catch (error) {
            throw error;
        }
    }

    async update(collectionId: number, data: UpdateCollectionDto): Promise<Collection> {
        try {

            const collection = await this.prisma.collection.update({
                where: {
                    id: collectionId,
                },
                data,
            });
            return collection;
        } catch (error) {
            throw error;
        }
    }

    async delete(collectionId: number): Promise<Collection> {
        try {
            const deletedCollection = await this.prisma.collection.delete({
                where: {
                    id: collectionId,
                },
            });

            return deletedCollection;
        } catch (error) {
            throw error;
        }
    }

    async getAllTasksOfCollection(collectionId: number): Promise<Task[]> {
        try {
            const tasks = await this.prisma.task.findMany({
                where: {
                    collectionId: collectionId,
                },
            });
            return tasks;
        } catch (error) {
            throw error;
        }
    }
}
