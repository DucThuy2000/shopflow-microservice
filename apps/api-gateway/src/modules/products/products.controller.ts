import {
  AUTH_PATTERN,
  AUTH_SERVICE,
  IProduct,
  IUser,
  ORDER_EVENTS,
  type OrderCreatedEvent,
  PRODUCT_PATTERNS,
  PRODUCT_SERVICE,
} from '@app/contracts';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  HttpException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, map, throwError, timeout } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private productClient: ClientProxy,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
  ) {}

  @Get(':id')
  // fake a case when a gateway route needs to send request to 2 services
  // so it just a simple code for that testing
  async findOne(@Param('id') id: string) {
    const product = await firstValueFrom<IProduct>(
      this.productClient.send(PRODUCT_PATTERNS.FIND_ONE, id).pipe(
        timeout(3000),
        catchError((err) =>
          throwError(
            () =>
              new HttpException(
                err?.message ?? 'product-service',
                err?.statusCode ?? 502,
              ),
          ),
        ),
      ),
    );

    if (!product.createdBy) return product;
    const user = await firstValueFrom<IUser>(
      this.authClient.send(AUTH_PATTERN.FIND_USER, product.createdBy).pipe(
        timeout(3000),
        catchError((err) =>
          throwError(
            () =>
              new HttpException(
                err?.message ?? 'auth-service',
                err?.statusCode ?? 502,
              ),
          ),
        ),
      ),
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
