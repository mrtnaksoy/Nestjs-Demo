import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// do without importing consumers module
import { Transport, ClientsModule} from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.register([{
      name:'products',
      transport:Transport.RMQ,
      options:{
        urls:['amqp://guest:guest@localhost:5672/vhost'],
        queue:'products-messages',
        queueOptions:{
          durable: false
        }
      }
    }])
  ],
  controllers: [AppController],
  providers: [AppService],
  exports:[AppService]
})
export class AppModule {}
