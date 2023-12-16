import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { ClientsModule } from "src/clients/clients.module";
import { ClientsService } from "src/clients/clients.service";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ClientsModule],
  controllers: [TasksController],
  providers: [TasksService, ClientsService],
})
export class TasksModule {}
