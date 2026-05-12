import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const start = Date.now();

    // Esperamos a que la respuesta termine para tener el status code real.
    res.on('finish', () => {
      const { statusCode } = res;
      const elapsed = Date.now() - start;

      this.logger.log(
        `(M) ${method.padEnd(6)} ${String(statusCode)} | ${originalUrl} | ${ip} | ${elapsed}ms`,
      );
    });

    next();
  }
}
