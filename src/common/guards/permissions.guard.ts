import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SetOperation } from '../lib/set-operation.lib';
import { UserLogged } from '../interfaces/user-logged.interface';
import { CodePermission } from '../interfaces/code-permissions.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly permissions: CodePermission[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const { permissions: userLoggedPermissions } = req.user as UserLogged;
    const setOperation = new SetOperation({
      firstArray: this.permissions,
      secondArray: userLoggedPermissions,
    });
    if (!setOperation.hasDifference()) return true;
    const codes = setOperation.difference().join(', ');
    throw new UnauthorizedException(
      `access denied: this endpoint not have: ${codes}`,
    );
  }
}
