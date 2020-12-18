
export class Product_add {
    public name: string;
    public description: string;
    public imagePath: string;
    public price: number;

    constructor(name: string,desc: string, imagePath:string, price: number){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.price = price;
    }
}