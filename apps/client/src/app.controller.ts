import { Controller, Get, Post, Put, Delete, Logger, Body, Param, UseFilters, HttpException,HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

import {ProductDto} from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ValidationPipe } from './pipes/validation.pipe';

const logger = new Logger('client-controller');

// Exceptions
import { HttpExceptionFilter } from './exceptions/httpException.filter';
import { validationExceptionFilter} from './exceptions/validationException.filte';

// Swagger
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Producer')
@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({description:'The resource list has been successfully delivered'})
  @ApiForbiddenResponse({description:'Forbidden'})
  getAll():Promise<Product[]>{
    logger.log('GET request recieved');
    return this.appService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({description:'The resource has been successfully delivered'})
  @ApiForbiddenResponse({description:'Forbidden'})
  getOne(@Param('id') id:string):Promise<Product>{
    logger.log('GET request recieved');
    return this.appService.getOne(id)
    .then(res =>{
      if(res){
        return res;
      } 
      else{
        logger.log(`requseted data not found with status ${HttpStatus.NOT_FOUND}`);
        throw new HttpException('Product not found',HttpStatus.NOT_FOUND);
      } 
      
    })
    .catch(()=>{
      logger.log(`requseted data not found with status ${HttpStatus.NOT_FOUND}`);
      throw new HttpException('Product not found',HttpStatus.NOT_FOUND);
    })
  }
  
  @Post()
  @ApiCreatedResponse({description:'The resource has been successfully created'})
  @ApiForbiddenResponse({description:'Forbidden'})
  @UseFilters(validationExceptionFilter)
  create(@Body(ValidationPipe) productDto:ProductDto){
      logger.log(`POST request recieved with Title ${productDto.title}`);
      const postData = this.appService.create(productDto);

      return postData;
  }

  @Put(':id')
  @ApiOkResponse({description:'The resource has been successfully updated'})
  @ApiForbiddenResponse({description:'Forbidden'})
  @UseFilters(validationExceptionFilter)
  update(@Body(ValidationPipe) productDto:ProductDto,@Param('id') id:string):Promise<Product>{
    logger.log(`PUT request recieved for ${id}`);
    return this.appService.update(id,productDto);
  }

  @Delete(':id')
  @ApiOkResponse({description:'The resource has been successfully deleted'})
  @ApiForbiddenResponse({description:'Forbidden'})
  delete(@Param('id') id:string):Promise<Product>{
    logger.log(`DELETE request recieved for ${id}`);
    return this.appService.delete(id)
    .then(res =>{
      if(res){
        return res;
      } 
      else{
        logger.log(`invalid request with Status code ${HttpStatus.BAD_REQUEST}`);
        throw new HttpException('BAD Request',HttpStatus.BAD_REQUEST);
      } 
      
    })
    .catch(()=>{
      logger.log(`Invalid request with Satus code ${HttpStatus.BAD_REQUEST}`);
      throw new HttpException('Product not found',HttpStatus.BAD_REQUEST);
    })
  }
}
