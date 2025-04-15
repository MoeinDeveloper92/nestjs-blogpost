import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Nestjs Blog Post - Master Class')
    .setDescription('Use The base URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT Licence', 'http://github.mit.com')
    .addServer('http://localhost:3000')
    .setVersion('1.0.0')
    .build();
  //Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`The app is running successfully....`);
  });
}
bootstrap();
