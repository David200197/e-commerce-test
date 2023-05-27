import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PermissionsService } from 'src/modules/permissions/permissions.service';
import { RolesService } from 'src/modules/roles/roles.service';
import { TagsService } from 'src/modules/tags/tags.service';
import { UsersService } from 'src/modules/users/users.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateDto } from './dtos/create.dto';

@Injectable()
export class LauncherService implements OnModuleInit {
  private logger = new Logger();

  constructor(
    private readonly usersService: UsersService,
    private readonly rolesServices: RolesService,
    private readonly permissionsService: PermissionsService,
    private readonly tagsService: TagsService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await Promise.all([this.generateInitialData(), this.generateTagsData()]);
  }

  private async createRolesOnPermissions({ permissionId, rolId }: CreateDto) {
    return await this.prisma.rolesOnPermissions.create({
      data: {
        permissionId,
        rolId,
      },
    });
  }

  private async generateTagsData() {
    const tagsCount = await this.tagsService.getCount();
    if (tagsCount) return;
    this.logger.warn('Sin tags, agregando tags');

    const tagsPromise = [
      'zapatos',
      'ropa',
      'jugetes',
      'libros',
      'accesorios para el hogar',
    ].map((name) => this.tagsService.create({ name }));

    await Promise.all(tagsPromise);

    this.logger.warn('Sin tags, agregando tags');
  }

  private async generateInitialData() {
    const [usersCount, rolesCount, permissionsCount] = await Promise.all([
      this.usersService.getCount(),
      this.rolesServices.getCount(),
      this.permissionsService.getCount(),
    ]);

    if (usersCount || rolesCount || permissionsCount) return;
    this.logger.warn('Sin datos, guardando datos iniciales');

    const permissionPromises = [
      'create_product',
      'update_product',
      'delete_product',
      'sell_product',
      'get_items_sold',
      'get_total_amount',
    ].map((name) => this.permissionsService.create({ name }));

    const [
      createProductPermission,
      updateProductPermission,
      deleteProductPermission,
      sellProductPermission,
      getItemSoldProductPermission,
      getAmountTotalProductPermission,
    ] = await Promise.all(permissionPromises);

    const rolesPromises = ['administrador', 'editor'].map((name) =>
      this.rolesServices.create({ name }),
    );

    const [adminRol, editorRol] = await Promise.all(rolesPromises);

    await Promise.all([
      this.createRolesOnPermissions({
        rolId: adminRol.id,
        permissionId: createProductPermission.id,
      }),
      this.createRolesOnPermissions({
        rolId: adminRol.id,
        permissionId: updateProductPermission.id,
      }),
      this.createRolesOnPermissions({
        rolId: adminRol.id,
        permissionId: deleteProductPermission.id,
      }),
      this.createRolesOnPermissions({
        rolId: adminRol.id,
        permissionId: sellProductPermission.id,
      }),
      this.createRolesOnPermissions({
        rolId: adminRol.id,
        permissionId: getItemSoldProductPermission.id,
      }),
      this.createRolesOnPermissions({
        rolId: adminRol.id,
        permissionId: getAmountTotalProductPermission.id,
      }),
      this.createRolesOnPermissions({
        rolId: editorRol.id,
        permissionId: createProductPermission.id,
      }),
      this.createRolesOnPermissions({
        rolId: editorRol.id,
        permissionId: updateProductPermission.id,
      }),
      this.createRolesOnPermissions({
        rolId: editorRol.id,
        permissionId: deleteProductPermission.id,
      }),
    ]);

    await Promise.all([
      this.usersService.create({
        email: 'admin@gmail.com',
        name: 'AdminUser',
        password: 'secret',
        rolId: adminRol.id,
      }),
      this.usersService.create({
        email: 'editor@gmail.com',
        name: 'EditorUser',
        password: 'secret',
        rolId: editorRol.id,
      }),
      this.usersService.create({
        email: 'user@gmail.com',
        name: 'NormalUser',
        password: 'secret',
      }),
    ]);

    this.logger.log('Datos iniciales guardados');
  }
}
