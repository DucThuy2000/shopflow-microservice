import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUTH_SERVICE,
  AUTH_SERVICE_PORT,
  PRODUCT_SERVICE,
  PRODUCT_SERVICE_PORT,
} from '@app/contracts';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: PRODUCT_SERVICE_PORT },
      },
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: AUTH_SERVICE_PORT },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
