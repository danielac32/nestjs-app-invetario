
import { IsNotEmpty, IsString, IsInt, IsDateString ,MaxLength, MinLength,IsOptional } from 'class-validator';
 
 import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export class CreateProductoDto {

  @IsOptional()
  id: number;


  /*@ApiProperty({
    example: "User name",
    description: "Name of your user",
  })*/

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  categoriaId: number;
}
