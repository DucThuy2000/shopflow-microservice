import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE_PORT } from '@app/contracts';

async function bootstrap() {
  const service = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductServiceModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: PRODUCT_SERVICE_PORT },
    },
  );

  await service.listen();
}
bootstrap();
