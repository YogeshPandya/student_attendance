import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomHttpExceptionFilter } from './utils/http-exception.filter';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

     // Apply the global filter
    app.useGlobalFilters(new CustomHttpExceptionFilter());

    // Enable CORS with a specific origin, methods, and credentials
    app.enableCors({
      origin: ['http://localhost:3000','http://192.168.1.118:3000'],  // Add multiple origins if needed
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
    });

    const port = 4000;
    await app.listen(port);
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error during app bootstrap:', error);
  }
}
bootstrap();
