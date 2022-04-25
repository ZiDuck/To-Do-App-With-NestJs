import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateTaskDto): Promise<Task> {
        try {
            const task = await this.prisma.task.create({
                data,
            });
            return task;
        } catch (error) {
            throw error;
        }
    }

    async update(taskId: number, data: UpdateTaskDto): Promise<Task> {
        try {
            const task = await this.prisma.task.update({
                where: {
                    id: taskId,
                },
                data,
            });
            return task;
        } catch (error) {
            throw error;
        }
    }

    async delete(taskId: number): Promise<Task> {
        try {
            const deletedTask = await this.prisma.task.delete({
                where: {
                    id: taskId,
                },
            });
            return deletedTask;
        } catch (error) {
            throw error;
        }
    }
}
