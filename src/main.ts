import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const logger = new Logger('Request Middleware', { timestamp: true });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api', { exclude: ['/'] });

  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use((req, res, next) => {
    const orignelSend = res.send;
    res.send = function () {
      logger.warn(`Response for ${req.method} ${req.url}`);
      orignelSend.apply(res, arguments);
    };
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('ITECH CRM API')
    .setDescription('API documentation for the ITECH CRM platform')
    .setVersion('3.0')
    .addServer(`http://localhost:${PORT}`)
    .addServer(`${process.env.SERVER_URL}`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
    },
  });

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
