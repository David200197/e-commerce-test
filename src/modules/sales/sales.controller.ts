import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { PermissionsGuard } from '@/common/guards/permissions.guard';
import { FindQueryDto } from '@/common/dtos/find-query.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @UseGuards(JwtAuthGuard, new PermissionsGuard(['get_items_sold']))
  async findAll(@Query() findQueryDto: FindQueryDto) {
    return await this.salesService.findAll(findQueryDto);
  }

  @Get('total_amount')
  @UseGuards(JwtAuthGuard, new PermissionsGuard(['get_total_amount']))
  async getTotalAmount() {
    const totalAmount = await this.salesService.getTotalAmount();
    return { totalAmount };
  }
}
