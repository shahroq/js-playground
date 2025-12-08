import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('/api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
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
