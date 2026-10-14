import { AUTH_PATTERN, AUTH_SERVICE } from '@app/contracts';
import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, tap, throwError, timeout } from 'rxjs';
import { AuthLoginDto, AuthRegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private client: ClientProxy) {}

  @Post('register')
  register(@Body() data: AuthRegisterDto) {
    return this.client.send(AUTH_PATTERN.REGISTER, data).pipe(
      // tap((res) => console.log(res)),
      timeout(5000),
      catchError((err) =>
        throwError(
          () =>
            new HttpException(
              err?.message ?? 'Upstream error',
              err?.statusCode ?? 502,
            ),
        ),
      ),
    );
  }

  @Post('login')
  login(@Body() dto: AuthLoginDto) {
    return this.client.send(AUTH_PATTERN.LOGIN, dto).pipe(
      tap((res) => {
        console.log(`user ${res.username} logged in`);
      }),
      catchError((err) =>
        throwError(
          () =>
            new HttpException(
              err?.message ?? 'Upstream error',
              err?.statusCode ?? 502,
            ),
        ),
      ),
    );
  }
}
