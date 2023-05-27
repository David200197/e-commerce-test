import { ExecutionContext } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';
import { CodePermission } from '../interfaces/code-permissions.interface';

describe('PermissionsGuard', () => {
  const permissionsGuard = new PermissionsGuard([
    'create_product',
    'sell_product',
  ]);

  const getContext = (permissions: CodePermission[]) => {
    const req = { user: { permissions } };
    const getRequest = () => req;
    const switchToHttp = () => ({ getRequest });
    return { switchToHttp } as ExecutionContext;
  };

  describe('canActivate', () => {
    it('Should be return true', () => {
      const context = getContext([
        'create_product',
        'update_product',
        'sell_product',
      ]);
      const isValid = permissionsGuard.canActivate(context);
      expect(isValid).toEqual(true);
    });
    it('Should be return false', () => {
      const context = getContext([
        'get_items_sold',
        'update_product',
        'create_product',
      ]);
      const isValid = permissionsGuard.canActivate(context);
      expect(isValid).toEqual(false);
    });
  });
});
