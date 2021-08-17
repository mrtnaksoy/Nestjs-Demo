import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title:String,
    description: String,
    link:String,
    price:String,
    currency:String,
    quantity:Number,
    brand:String,
    color:String,
    gender:String,
    gtin:String,
    mpn:String,
    condition:String,
});