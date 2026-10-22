import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { UpstreamError } from './upstream.filter';
import { TimeoutError } from 'rxjs';

interface ErrorBody {
  success: boolean;
  statusCode: number;
  message: string | string[];
  code?: string;
}

@Catch()
export class GatewayExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GatewayExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const body = this.toBody(exception);
    if (body.statusCode >= 500)
      this.logger.error(
        body.message,
        exception instanceof UpstreamError ? exception.original : exception,
      );
    res.json(body);
  }

  toBody(exception: unknown): ErrorBody {
    if (exception instanceof HttpException) {
      // ValidationPipe, ParseIntPipe, guards...
      const r = exception.getResponse();
      return typeof r === 'string'
        ? { success: false, statusCode: exception.getStatus(), message: r }
        : { ...(r as ErrorBody), success: false };
    }

    if (exception instanceof UpstreamError) {
      const err = exception.original as Partial<ErrorBody> | undefined;
      if (err instanceof TimeoutError)
        return {
          success: false,
          statusCode: 504,
          message: `${exception.service} timed out`,
        };

      if (typeof err?.statusCode === 'number')
        // RpcNotFound, RpcConflictError...
        return {
          success: false,
          statusCode: err.statusCode,
          message: err.message ?? 'Error',
          code: err.code,
        };

      return {
        success: false,
        statusCode: 503,
        message: `${exception.service} unavailable`,
      }; // ECONNREFUSED etc.
    }
    return {
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    };
  }
}
