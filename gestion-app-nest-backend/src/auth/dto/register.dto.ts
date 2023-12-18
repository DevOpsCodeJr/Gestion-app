import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(7)
  dni: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  password: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  role: string;
}
