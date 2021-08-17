import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { ProductDto } from './dto/product.dto';
const logger = new Logger('consumer_service');

@Injectable()
export class ConsumerService {
  
  constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

  //products: Product[] = [];

  getAll(msg:string):Product[] {
    logger.log(`GET Job Done by ${msg}`);
    return this.productModel.find();
  }

  getOne(id:string):Product {
    logger.log(`GET Job Done by ${id}`);
    return this.productModel.findOne({_id:id});
  }

  async create(productDto:ProductDto) : Promise<Product>{
    const newProduct = new this.productModel(productDto);
    logger.log(`POST Job Done with Title ${productDto.title}`);
    return await newProduct.save();
  }

  async update(id:string, productDto:ProductDto): Promise<Product>{
    logger.log(`PUT Job Done for id ${id}`);
    return await this.productModel.findByIdAndUpdate(id,productDto,{new:true});
  }
  async delete(id:string):Promise<Product>{
    logger.log(`DELETE Job done for ${id}`);
    return await this.productModel.findByIdAndRemove({_id:id});
  }
}
