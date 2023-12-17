import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { AuthGuard } from "src/auth/guard/auth.guard";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  remove(@Param("clientNumber") clientNumber: number) {
    return this.clientsService.remove(clientNumber);
  }
}
