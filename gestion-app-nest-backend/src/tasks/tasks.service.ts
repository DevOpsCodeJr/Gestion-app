import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "src/clients/entities/client.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const client = await this.clientRepository.findOneBy({
      clientNumber: createTaskDto.clientNumber,
    });

    if (!client) {
      throw new BadRequestException("Client not found");
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      client,
    });

    return await this.taskRepository.save(task);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(orderNumber: number) {
    return await this.taskRepository.findOne({ where: { orderNumber } });
  }

  async update(orderNumber: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update(orderNumber, updateTaskDto);
  }

  async remove(orderNumber: number) {
    return await this.taskRepository.softDelete(orderNumber);
  }
}
