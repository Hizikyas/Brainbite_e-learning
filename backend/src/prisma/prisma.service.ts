// Ensure Prisma uses binary engine before the client is imported
process.env.PRISMA_CLIENT_ENGINE_TYPE = process.env.PRISMA_CLIENT_ENGINE_TYPE || 'binary';

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      // Log the error but don't rethrow to avoid crashing the serverless function
      // during cold starts when the database may be temporarily unreachable.
      // Subsequent requests will surface connection errors which can be
      // handled more gracefully at the request level.
      // Keep the process alive so Vercel can return a 5xx response instead
      // of a crashed function (FUNCTION_INVOCATION_FAILED).
      // For production serverless workloads prefer Prisma Data Proxy.
      // eslint-disable-next-line no-console
      console.error('Prisma $connect() failed on module init:', err);
    }
  }
  
  async onModuleDestroy() {
    await this.$disconnect();
  }
}