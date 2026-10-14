import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ProductsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
