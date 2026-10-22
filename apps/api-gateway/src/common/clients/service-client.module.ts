import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUTH_SERVICE,
  AUTH_SERVICE_PORT,
  PRODUCT_SERVICE,
  PRODUCT_SERVICE_PORT,
} from '@app/contracts';
import { ServiceClient } from './service-client';

export const PRODUCT_CLIENT = Symbol('PRODUCT_CLIENT');
export const AUTH_CLIENT = Symbol('AUTH_CLIENT');

@Global()
@Module({
  imports: [
    // Nestjs will resolve this dependencies first
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
  providers: [
    // then we can use PRODUCT_SERVICE token in the provider
    {
      provide: PRODUCT_CLIENT,
      // inject PRODUCT_SERVICE token from registered above to this provider
      inject: [PRODUCT_SERVICE],
      // when we need some logic, or need to inject dependencies, just use useFactory()
      // it return an instance of a class, or values
      useFactory: (client) => new ServiceClient(PRODUCT_SERVICE, client),
    },

    {
      provide: AUTH_CLIENT,
      inject: [AUTH_SERVICE],
      useFactory: (client) => new ServiceClient(AUTH_SERVICE, client),
    },
  ],
  // export providers using its token, other module can use it without importing
  // anything else, cuz this module is global one.
  exports: [PRODUCT_CLIENT, AUTH_CLIENT],
})
export class ServiceClientModule {}
