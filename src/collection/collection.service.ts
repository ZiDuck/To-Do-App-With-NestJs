import { Injectable } from '@nestjs/common';
import { Collection, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionDto, UpdateCollectionDto } from './dto';
@Injectable()
export class CollectionService {
    constructor(private prisma: PrismaService) {}

    async store(userId: number, createCollectionDto: CreateCollectionDto): Promise<Collection> {
        try {
            const { nameCollection } = createCollectionDto;
            const collection = await this.prisma.collection.create({
                data: {
                    nameCollection,
                    userId,
                },
            });
            return collection;
        } catch (error) {
            return error;
        }
    }

    async update(collectionId: number, updateCollectionDto: UpdateCollectionDto): Promise<Collection> {
        try {
            const { nameCollection } = updateCollectionDto;

            const collection = await this.prisma.collection.update({
                where: {
                    id: collectionId,
                },
                data: {
                    nameCollection,
                },
            });
            return collection;
        } catch (error) {
            return error;
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
            return error;
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
            return error;
        }
    }
}
