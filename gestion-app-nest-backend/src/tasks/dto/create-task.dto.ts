import {
  IsBoolean,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  @IsPositive()
  orderNumber: number;

  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MaxLength(140)
  description: string;

  @IsBoolean()
  done?: boolean;

  @IsInt()
  @IsPositive()
  clientNumber: number;
}
