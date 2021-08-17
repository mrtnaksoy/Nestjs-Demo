import { Controller, Logger, Get, Body, Param } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

import { Product } from './interfaces/product.interface';
import { ProductDto } from './dto/product.dto';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

const logger = new Logger('consumer-controller');

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @MessagePattern('getAll')
  async getAll(msg:string):Promise<Product[]> {
    logger.log(`Picking GET Job from Queue`);
    return this.consumerService.getAll(msg);
  }

  @MessagePattern('getOne')
  async getOne(id:string):Promise<Product>{
    logger.log(`picking GET Job from Queue for ${id}`);
    return this.consumerService.getOne(id);
  }

  @MessagePattern('create')
  async create(productDto:ProductDto): Promise<Product>{
    logger.log(`Picking POST Job from Queue`);
    return await this.consumerService.create(productDto);
  }


  @MessagePattern('update')
  async update(postData:{id:string,productDto:ProductDto}):Promise<Product>{
    logger.log(`Picking PUT Job from Queue for ${postData.id}`);
    return await this.consumerService.update(postData.id, postData.productDto);
  }

  @MessagePattern('delete')
  async delete(id:string):Promise<Product>{
    logger.log(`picking DELETE Job from Queue for ${id}`);
    return await this.consumerService.delete(id);
  }
}
