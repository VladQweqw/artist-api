import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser())
  
  app.enableCors({
    origin: "http://localhost:5173", 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'withcredentials', 'credentials'], 
    credentials: true,
  });
    
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: "/public/"
  }) 

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
