import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE_PORT } from '@app/contracts';

async function bootstrap() {
  const service = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: AUTH_SERVICE_PORT },
    },
  );
  await service.listen();
}
bootstrap();
