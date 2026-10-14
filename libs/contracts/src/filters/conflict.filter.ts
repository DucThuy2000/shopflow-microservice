import { RpcException } from '@nestjs/microservices';

export class RpcConflictError extends RpcException {
  constructor(message: string) {
    super({ statusCode: 409, message, code: 'CONFLICT_CODE' });
  }
}
