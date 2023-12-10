import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const client = await this.taskRepository.findOneBy({
      clientNumber: createTaskDto.clientNumber,
    });

    if (!client) {
      throw new BadRequestException('Client not found');
    }

    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save({
      ...task,
      client,
    });
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(orderNumber: number) {
    return await this.taskRepository.findOneBy({ orderNumber });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(orderNumber: number) {
    return await this.taskRepository.softDelete(orderNumber);
  }
}
