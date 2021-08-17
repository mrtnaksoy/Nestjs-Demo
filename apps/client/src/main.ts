import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger } from '@nestjs/common';

// Swagger
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

const logger = new Logger('client');

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  //enable cross-origin resouce sharing 
  app.enableCors();

  // Swagger Configuration 
  const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS MonoRepo Producer')
  .setDescription('This documentation illustrates complete Producer workflow, data types and mechanics. Do go through the details and let me know if case of bugs.')
  .setVersion('v1.0.0')
  .build()

  const doc = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('api',app,doc);
  
  await app.listen(3000,()=>logger.log('Client Severs is listening at Port = 3000 '));
}
bootstrap();
