import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  UseGuards,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateDto } from './dtos/create.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { ParamDto } from './dtos/param.dto';
import { UpdateDto } from './dtos/update.dto';
import { FindDto } from './dtos/find.dto';
import { FindQueryDto } from 'src/common/dtos/find-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('fetch')
  @UseGuards(JwtAuthGuard)
  async findAll(@Body() findDto: FindDto, @Query() findQueryDto: FindQueryDto) {
    return await this.productsService.findAll(findDto, findQueryDto);
  }

  @Post('total-element')
  @UseGuards(JwtAuthGuard)
  async findTotalElements(@Body() findDto: FindDto) {
    const totalElement = await this.productsService.findTotalElements(findDto);
    return { totalElement };
  }

  @Get(':sku')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param() paramDto: ParamDto) {
    const product = await this.productsService.findOneBySku(paramDto.sku);
    return { product };
  }

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
