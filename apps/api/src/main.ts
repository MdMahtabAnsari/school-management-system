import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // The library will re-add the default body parsers for non-auth routes.
    bodyParser: false,
  });
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);
  const config = new DocumentBuilder()
    .setTitle('School Management System API')
    .setDescription('The School Management System API documentation')
    .setVersion('1.0')
    .addTag('school-management-system')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/openapi', app, documentFactory);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
