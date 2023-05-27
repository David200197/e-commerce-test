import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import enviroment from '@/config/enviroment';
import { Injectable } from '@nestjs/common';
import { UserLogged } from '@/common/interfaces/user-logged.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: enviroment().jwt.secret,
    });
  }

  async validate({ email, permissions, id }: UserLogged): Promise<UserLogged> {
    return { email, permissions, id };
  }
}
