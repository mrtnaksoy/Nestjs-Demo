import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IS_ENUM, Length, Max, Min} from 'class-validator';

// get enum defined in product.interface 
import { ProductFor, ProductCondition } from './../interfaces/product.interface';

// Swagger 
//import { ApiProperty } from '@nestjs/swagger';
import { query } from 'express';

/* 
Task Requirement for data validation as in product.interface

    1- data being sent to database must be either string or number depending on the requirement mentioned in product.interface
    2- for String parameters, it must not be empty as well such as title can not be empty due to business logic, consumers 
    would not be interested in a product with no title. however, due to any reason, product description may be empty.
    3- For Quantity, I have put arbitrary validation requirement such as minimum quantity of at least 1 and 
    maximum quantity of 100 only, However this really depends on business logic which can be set up at any state.
    4- For Swagger Documentation I have put mpn and gtin fields only as optional and i assume all other fields are required as per requirement
*/
export class ProductDto {
    /* @ApiProperty({
        type: String,
        description:'Product Title. Number of Characters greater than 5 and less than 50 ',
        default:''
    }) */
    @IsString()
    @IsNotEmpty()
    @Length(5,50,{message:'Title should be between 5 and 50 charactors'})
    readonly title:string;

    /* @ApiProperty({
        type: String,
        description:'Product Description ',
        default:''
    }) */
    @IsString()
    readonly description: string;

    /* @ApiProperty({
        type: String,
        description:'Product Link',
        default:''
    }) */
    @IsString()
    readonly link: string;

   /*  @ApiProperty({
        type: String,
        description:'Product Price.',
        default:'100'
    }) */
    @IsString()
    @IsNotEmpty()
    readonly price:string;

    /* @ApiProperty({
        type: String,
        description:'Product Price Currency ',
        default:''
    }) */
    @IsString()
    @IsNotEmpty()
    readonly currency: string;

    /* @ApiProperty({
        type: Number,
        description:'Product Quantity which must be greater than 0 and less than 101',
        default:1
    }) */
    @IsNumber()
    @IsNotEmpty()
    @Min(1,{message:'Quantity must be at least 1'})
    @Max(100,{message:'Quantity can not exceed 100'})
    readonly quantity: number;

    /* @ApiProperty({
        type: String,
        description:'Product Brand ',
        default:''
    }) */
    @IsString()
    readonly brand: string;

    /* @ApiProperty({
        type: String,
        description:'Product Color ',
        default:'White'
    }) */
    @IsString()
    readonly color:string;

    /* @ApiProperty({
        type:String,
        description:'Gender: For Whome this product is For? Male / Female Or Unisex ',
        default:'Male'
        
    }) */
    @IsEnum(ProductFor,{each:true})
    readonly gender: ProductFor[];

    /* @ApiProperty({
        type: String,
        required:false,
        description:'Product GTIN : Gloabal Item Trade Number'
    }) */
    @IsString()
    @IsOptional()
    readonly gtin:string;

    /* @ApiProperty({
        type: String,
        required:false,
        description:'Product MPN: Manufacturing Part Number '
    }) */
    @IsString()
    @IsOptional()
    readonly mpn:string;

    /* @ApiProperty({
        type: String,
        description:'Product Condition, which can be New or Used ',
        default:'New'
    }) */
    @IsEnum(ProductCondition,{each:true})
    readonly condition:ProductCondition[];
}