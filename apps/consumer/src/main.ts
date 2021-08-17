import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

const logger = new Logger('consumer');

async function bootstrap() {
  
  const app = await NestFactory.createMicroservice(ConsumerModule,{
    transport: Transport.RMQ,
    options:{
      urls:['amqp://guest:guest@localhost:5672/vhost'],
      queue:'products-messages',
      queueOptions:{
        durable: false
      }
    }
  })  
  
  await app.listen(()=>logger.log('Microservice is now Listening .... '));
}
bootstrap();
