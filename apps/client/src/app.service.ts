import { Inject, Injectable, Logger } from '@nestjs/common';

import { ClientProxy} from '@nestjs/microservices';

import { Product } from './interfaces/product.interface';
import { ProductDto} from './dto/product.dto';

const logger = new Logger('client-service');

@Injectable()
export class AppService {

  constructor(@Inject('products') private readonly client:ClientProxy){};

  getAll(){
    logger.log('Sending GET Job to Queue');
    return this.client.send<Product[]>('getAll','getAll').toPromise();
  }

  getOne(id:string){
    logger.log('Sending GET Job to Queue');
    return this.client.send<Product>('getOne',id).toPromise();
  }
  
  create(productDto:ProductDto){
    logger.log(`sending POST Job to Queue for ${productDto.title}`);
    return this.client.send<Product>('create',productDto).toPromise();
    
  }

  update(id:string, productDto:ProductDto){
    logger.log(`sending PUT Job to Queue for ${id}`);
    const postData ={}
    return this.client.send<Product>('update',{id,productDto}).toPromise();
  }
  delete(id:string){
    logger.log(`sending DELETE Job to Queue for ${id}`);
    return this.client.send<Product>('delete',id).toPromise();
  }
}
