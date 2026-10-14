import { AUTH_SERVICE, AUTH_SERVICE_PORT } from '@app/contracts';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: { port: AUTH_SERVICE_PORT, host: '127.0.0.1' },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
