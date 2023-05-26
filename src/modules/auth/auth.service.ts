import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserLogged } from '../../common/interfaces/user-logged.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtTokenService: JwtService,
  ) {}

  async me({ email, permissions }: UserLogged) {
    const user = await this.usersService.findOne({ email });
    delete user.password;
    return { user, permissions };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOne({ email }).catch((error) => {
      if (error instanceof NotFoundException)
        throw new UnauthorizedException('invalid credentials');
      throw error;
    });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('user is unauthorized');

    const permissions =
      user?.rol?.rolesOnPermissions?.map(({ permission }) => permission.name) ||
      [];

    delete user.password;

    const accessToken = this.jwtTokenService.sign({
      id: user.id,
      email: user.email,
      permissions,
    });
    return { user, accessToken, permissions };
  }
}
