import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            const { nameTask, collectionId, deadline, description } = createTaskDto;
            const task = await this.prisma.task.create({
                data: {
                    nameTask,
                    collectionId,
                    deadline,
                    description,
                },
            });
            return task;
        } catch (error) {
            return error;
        }
    }

    async update(taskId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        try {
            const { nameTask, deadline, description, state } = updateTaskDto;
            console.log(nameTask, deadline, description, state);
            const task = await this.prisma.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    nameTask,
                    deadline,
                    description,
                    state,
                },
            });
            return task;
        } catch (error) {
            return error;
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
            return error;
        }
    }
}
