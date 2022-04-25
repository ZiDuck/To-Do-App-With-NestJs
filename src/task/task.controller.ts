import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Task } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post()
    create(@Body() data: CreateTaskDto): Promise<Task> {
        return this.taskService.create(data);
    }

    @Put(':id')
    update(@Param('id') taskId: string, @Body() data: UpdateTaskDto): Promise<Task> {
        return this.taskService.update(+taskId, data);
    }

    @Delete(':id')
    delete(@Param('id') taskId: string): Promise<Task> {
        return this.taskService.delete(+taskId);
    }
}
