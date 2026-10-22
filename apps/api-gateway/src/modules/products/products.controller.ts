import {
  AUTH_PATTERN,
  IProduct,
  IUser,
  ORDER_EVENTS,
  type OrderCreatedEvent,
  PRODUCT_PATTERNS,
} from '@app/contracts';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  AUTH_CLIENT,
  PRODUCT_CLIENT,
} from '../../common/clients/service-client.module';
import { ServiceClient } from '../../common/clients/service-client';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_CLIENT) private productClient: ServiceClient,
    @Inject(AUTH_CLIENT) private authClient: ServiceClient,
  ) {}

  @Get(':id')
  // fake a case when a gateway route needs to send request to 2 services
  // so it just a simple code for that testing
  async findOne(@Param('id') id: string) {
    const product = await this.productClient.send<IProduct>(
      PRODUCT_PATTERNS.FIND_ONE,
      id,
    );

    if (!product.createdBy) return product;
    const user = this.authClient.send<IUser>(
      AUTH_PATTERN.FIND_USER,
      product.createdBy,
    );

    return {
      ...product,
      createdBy: user,
    };
  }

  @Post('fake-order')
  create(@Body() body: OrderCreatedEvent) {
    this.productClient.emit(ORDER_EVENTS.CREATED, body);
    return { success: true };
  }
}
