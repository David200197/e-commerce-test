import { CodePermission } from './code-permissions.interface';

export type UserLogged = {
  id: string;
  email: string;
  permissions: CodePermission[];
};
