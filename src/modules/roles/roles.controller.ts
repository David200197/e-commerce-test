import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesServices: RolesService) {}

  @Get()
  async getAll() {
    const roles = await this.rolesServices.findAll();
    return { roles };
  }
}
