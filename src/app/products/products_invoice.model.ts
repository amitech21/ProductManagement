import { Product } from './product.model';


export class ProductInvoice {
    public id: number;
    public name: string;
    public hsn_code: string;
    public description: string;
    public imagePath: string;
    public price: number;
    public quantity: number;

    // constructor(id: number, name: string,desc: string, imagePath:string, price: number, quantity: number){
    //     this.id = id;
    //     this.name = name;
    //     this.description = desc;
    //     this.imagePath = imagePath;
    //     this.price = price;
    //     this.quantity = quantity;
    // }

    constructor(product: Product, quantity: number){
        this.id = product.id;
        this.name = product.name;
        this.hsn_code = product.hsn_code;
        this.description = product.description;
        this.imagePath = product.imagePath;
        this.price = product.price;
        this.quantity = quantity;
    }
}