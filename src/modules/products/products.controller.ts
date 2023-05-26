import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateDto } from './dtos/create.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { ParamDto } from './dtos/param.dto';
import { UpdateDto } from './dtos/update.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, new PermissionsGuard(['create_product']))
  async create(@Body() createDto: CreateDto) {
    const product = await this.productsService.create(createDto);
    return { message: `El producto ${product.sku} a sido creado` };
  }

  @Put(':sku')
  @UseGuards(JwtAuthGuard, new PermissionsGuard(['update_product']))
  async update(@Param() paramDto: ParamDto, @Body() updateDto: UpdateDto) {
    const product = await this.productsService.update(paramDto.sku, updateDto);
    return { message: `El producto ${product.sku} a sido actualizado` };
  }

  @Delete(':sku')
  @UseGuards(JwtAuthGuard, new PermissionsGuard(['delete_product']))
  async delete(@Param() paramDto: ParamDto) {
    const product = await this.productsService.delete(paramDto.sku);
    return { message: `El producto ${product.sku} a sido eliminado` };
  }
}
