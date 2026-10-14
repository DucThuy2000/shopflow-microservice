import { Controller } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import {
  ORDER_EVENTS,
  PRODUCT_PATTERNS,
  type ProductPayload,
  type OrderCreatedEvent,
} from '@app/contracts';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ProductServiceController {
  constructor(private readonly service: ProductServiceService) {}

  @MessagePattern(PRODUCT_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.service.findOne(Number(id));
  }

  @MessagePattern(PRODUCT_PATTERNS.CREATE)
  create(@Payload() data: ProductPayload) {
    this.service.create(data);
  }

  @EventPattern(ORDER_EVENTS.CREATED)
  onOrderCreated(@Payload() event: OrderCreatedEvent) {
    // do something here
  }
}
