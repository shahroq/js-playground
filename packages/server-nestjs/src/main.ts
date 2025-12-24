import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('/api/v1');

  // or: as it need configService, initiate in app.module
  // app.useGlobalGuards(new ApiKeyGuard(config));

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
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    // new TimeoutInterceptor(), // moved to app.module
    // new WrapResponseInterceptor(), // moved to app.module
  );

  const port = config.get<number>('port') || 3000;
  const env = config.get<string>('env');

  await app.listen(port, () => {
    console.log(
      `🚀 Nest server running on port:${port}, env:${env}, and PID: ${process.pid}.`,
    );
  });
}
bootstrap();
