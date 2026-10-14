import { RpcException } from '@nestjs/microservices';

export class RpcBadRequest extends RpcException {
  constructor(message: string) {
    super({ statusCode: 400, message });
  }
}
