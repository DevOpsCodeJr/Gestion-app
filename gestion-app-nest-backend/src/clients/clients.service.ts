import { Injectable } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "./entities/client.entity";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

  async findAll() {
    return await this.clientRepository.find();
  }

  async findOne(clientNumber: number) {
    return await this.clientRepository.findOne({ where: { clientNumber } });
  }

  async update(clientNumber: number, updateClientDto: UpdateClientDto) {
    return await this.clientRepository.update(clientNumber, updateClientDto);
  }

  async remove(clientNumber: number) {
    return await this.clientRepository.softDelete(clientNumber);
  }
}
