import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";

import * as bcryptjs from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register({ name, dni, email, password, role }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException("User already exists");
    }

    return await this.usersService.create({
      name,
      dni,
      email,
      password: await bcryptjs.hash(password, 10),
      role,
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { id: user.id, email: user.email, name: user.name };

    const token = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      name: user.name,
      dni: user.dni,
      email,
      role: user.role,
      token,
    };
  }
}
