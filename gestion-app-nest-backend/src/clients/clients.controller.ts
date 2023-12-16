import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(":clientNumber")
  findOne(@Param("clientNumber") clientNumber: number) {
    return this.clientsService.findOne(clientNumber);
  }

  @Put(":clientNumber")
  update(
    @Param("clientNumber") clientNumber: number,
    @Body() updateClientDto: UpdateClientDto
  ) {
    return this.clientsService.update(clientNumber, updateClientDto);
  }

  @Delete(":clientNumber")
  remove(@Param("clientNumber") clientNumber: number) {
    return this.clientsService.remove(clientNumber);
  }
}
