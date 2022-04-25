import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Collection, Task, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CollectionService } from './collection.service';
import { CreateCollectionDto, UpdateCollectionDto } from './dto';

@UseGuards(JwtGuard)
@Controller('collections')
export class CollectionController {
    constructor(private collectionService: CollectionService) {}

    @Post()
    store(@GetUser() user: User, @Body() data: CreateCollectionDto): Promise<Collection> {
        return this.collectionService.store(user.id, data);
    }

    @Put(':id')
    update(@Param('id') collectionId: string, @Body() data: UpdateCollectionDto): Promise<Collection> {
        return this.collectionService.update(+collectionId, data);
    }

    @Delete(':id')
    delete(@Param('id') collectionId: string): Promise<Collection> {
        return this.collectionService.delete(+collectionId);
    }

    @Get(':id/tasks')
    getAllTasksOfCollection(@Param('id') collectionId: string): Promise<Task[]> {
        return this.collectionService.getAllTasksOfCollection(+collectionId);
    }
}
