import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SpelunkerModule } from 'nestjs-spelunker'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // The library will re-add the default body parsers for non-auth routes.
    bodyParser: false,
  });
  app.use(helmet());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.TRUSTED_CLIENT_URL?.split(',') || [],
    credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });
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
  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  console.log('graph LR');
  const mermaidEdges = edges.map(
    ({ from, to }) => `  ${from.module.name}-->${to.module.name}`,
  );
  console.log(mermaidEdges.join('\n'));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
