import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { UpstreamError } from '../filters/upstream.filter';

/**
 * This is a wrapper service, it wrap the send or emit event
 * to a specific client through TCP
 */

export class ServiceClient {
  constructor(
    private readonly service: string,
    private readonly proxy: ClientProxy,
    private readonly timeoutMs = 3000,
  ) {}

  send<TResult, TInput = unknown>(pattern: string, data: TInput) {
    return firstValueFrom(
      this.proxy.send<TResult, TInput>(pattern, data).pipe(
        timeout(this.timeoutMs),
        catchError((err) =>
          throwError(() => new UpstreamError(this.service, err)),
        ),
      ),
    );
  }

  emit<TInput>(pattern: string, data: TInput) {
    return this.proxy.emit(pattern, data);
  }
}
