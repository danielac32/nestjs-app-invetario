import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}
  

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }
  

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productoService.findAll();
  }
  
 

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(+id, updateProductoDto);
  }
  

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
