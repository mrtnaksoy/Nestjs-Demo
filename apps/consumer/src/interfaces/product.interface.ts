/* export interface Product{
    title:string
} */

// for video tutorial

// above can also be defined as
/* export class Product {
    constructor(
        public id:string,
        public title:string,
        public description:string,
        public price:number
    ){}
} */

export interface Product{
    title:string;
    description: string;
    link:string;
    price:string;
    currency:string;
    quantity:number;
    brand:string;
    color:string;
    gender:ProductFor[];
    gtin?:string;
    mpn?:string;
    condition:ProductCondition[];
}

export enum ProductFor {
    Male="Male",
    Female="Female",
    Unisex="Unisex"
}

export enum ProductCondition {
    New="New",
    Used="Used"
}