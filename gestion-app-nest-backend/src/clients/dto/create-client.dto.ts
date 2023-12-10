import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @IsInt()
  @IsPositive()
  clientNumber: number;

  @IsString()
  @MinLength(3)
  fullName: string;

  @IsString()
  @MaxLength(140)
  address: string;

  @IsString()
  @MinLength(7)
  phoneNumber: string;

  @IsString()
  paymentMethod: string;

  @IsInt()
  amount: number;

  @IsBoolean()
  debt: boolean;

  @IsString()
  @IsOptional()
  comments?: string;
}
