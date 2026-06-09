import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend API queries
  app.enableCors();
  
  // Listen on port 4000 for backend services
  const port = process.env.BACKEND_PORT ?? 4000;
  await app.listen(port);
  console.log(`Backend server running on http://localhost:${port}`);
}
bootstrap();
