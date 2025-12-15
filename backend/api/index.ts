import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

let serverPromise: Promise<any> | null = null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [process.env.FRONTEND_URL || 'https://brainbite-e-learning-sage.vercel.app', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Initialize Nest without listening to a port; return the underlying handler
  await app.init();
  const httpAdapter = app.getHttpAdapter().getInstance();
  return httpAdapter;
}

export default async function handler(req: any, res: any) {
  if (!serverPromise) serverPromise = bootstrap();
  try {
    const server = await serverPromise;
    return server(req, res);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Serverless handler bootstrap error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
