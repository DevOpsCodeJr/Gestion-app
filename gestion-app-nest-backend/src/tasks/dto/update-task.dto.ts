import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  orderNumber?: number;

  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @IsString()
  @MaxLength(140)
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @IsInt()
  @IsPositive()
  @IsOptional()
  clientNumber?: number;
}
