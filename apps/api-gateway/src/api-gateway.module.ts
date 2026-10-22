import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServiceClientModule } from './common/clients/service-client.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GatewayExceptionFilter } from './common/filters/gateway-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

@Module({
  imports: [ProductsModule, AuthModule, ServiceClientModule],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: GatewayExceptionFilter },
    { provide: APP_INTERCEPTOR, useFactory: () => new TimeoutInterceptor() },
  ],
})
export class ApiGatewayModule {}
