import { RpcException } from '@nestjs/microservices';

export class RpcNotFound extends RpcException {
  constructor(message: string) {
    super({ statusCode: 404, message });
  }
}
