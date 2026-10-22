import { AUTH_PATTERN } from '@app/contracts';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import { AUTH_CLIENT } from '../../common/clients/service-client.module';
import { ServiceClient } from '../../common/clients/service-client';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_CLIENT) private client: ServiceClient) {}

  @Post('register')
  register(@Body() data: AuthRegisterDto) {
    return this.client.send(AUTH_PATTERN.REGISTER, data);
  }

  @Post('login')
  login(@Body() dto: AuthLoginDto) {
    return this.client.send(AUTH_PATTERN.LOGIN, dto);
  }
}
