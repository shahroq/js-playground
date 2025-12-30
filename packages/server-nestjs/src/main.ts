import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // globals
  app.setGlobalPrefix('/api/v1');

  // GUARDS
  // app.useGlobalGuards(new ApiKeyGuard(config));

  // PIPES
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // INTERCEPTORS
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    // new TimeoutInterceptor(), // moved to common.module
    // new WrapResponseInterceptor(), // moved to common.module
  );

  // FILTERS
  // app.useGlobalFilters(new HttpExceptionFilter()); // moved to common.module, as it needs dependency

  const port = config.get<number>('port') || 3000;
  const env = config.get<string>('env');

  await app.listen(port, () => {
    console.log(
      `🚀 Nest server running on port:${port}, env:${env}, and PID: ${process.pid}.`,
    );
  });
}
bootstrap();
