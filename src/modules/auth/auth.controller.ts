import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserLogged } from '@/common/interfaces/user-logged.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@GetUser() userLogged: UserLogged) {
    return await this.authService.me(userLogged);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
