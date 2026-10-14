import { Controller } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AUTH_PATTERN,
  type LoginUserPayload,
  type RegisterUserPayload,
} from '@app/contracts';

@Controller()
export class AuthServiceController {
  constructor(private readonly authService: AuthServiceService) {}

  @MessagePattern(AUTH_PATTERN.REGISTER)
  register(@Payload() data: RegisterUserPayload) {
    return this.authService.register(data);
  }

  @MessagePattern(AUTH_PATTERN.LOGIN)
  login(@Payload() data: LoginUserPayload) {
    return this.authService.login(data);
  }

  @MessagePattern(AUTH_PATTERN.FIND_USER)
  findUser(@Payload() id: number) {
    return this.authService.findOne(id);
  }
}
