import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PermissionsService } from 'src/modules/permissions/permissions.service';
import { RolesOnPermissionsService } from 'src/modules/roles-on-permissions/roles-on-permissions.service';
import { RolesService } from 'src/modules/roles/roles.service';
import { TagsService } from 'src/modules/tags/tags.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class LauncherService implements OnModuleInit {
  private logger = new Logger();

  constructor(
    private readonly usersService: UsersService,
    private readonly rolesServices: RolesService,
    private readonly permissionsService: PermissionsService,
    private readonly rolesOnPermissionsService: RolesOnPermissionsService,
    private readonly tagsService: TagsService,
  ) {}

  async onModuleInit() {
    await Promise.all([this.generateInitialData(), this.generateTagsData()]);
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
    ].map((name) => this.permissionsService.create({ name }));

    const [
      createProductPermission,
      updateProductPermission,
      deleteProductPermission,
      sellProductPermission,
    ] = await Promise.all(permissionPromises);

    const rolesPromises = ['administrador', 'editor'].map((name) =>
      this.rolesServices.create({ name }),
    );

    const [adminRol, editorRol] = await Promise.all(rolesPromises);

    await Promise.all([
      this.rolesOnPermissionsService.create({
        rolId: adminRol.id,
        permissionId: createProductPermission.id,
      }),
      this.rolesOnPermissionsService.create({
        rolId: adminRol.id,
        permissionId: updateProductPermission.id,
      }),
      this.rolesOnPermissionsService.create({
        rolId: adminRol.id,
        permissionId: deleteProductPermission.id,
      }),
      this.rolesOnPermissionsService.create({
        rolId: adminRol.id,
        permissionId: sellProductPermission.id,
      }),
      this.rolesOnPermissionsService.create({
        rolId: editorRol.id,
        permissionId: createProductPermission.id,
      }),
      this.rolesOnPermissionsService.create({
        rolId: editorRol.id,
        permissionId: updateProductPermission.id,
      }),
      this.rolesOnPermissionsService.create({
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
