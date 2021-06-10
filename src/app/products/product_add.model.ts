
export class Product_add {
    public name: string;
    public hsn_code: string;
    public description: string;
    public imagePath: string;
    public price: number;

    constructor(name: string, hsn_code: string, desc: string, imagePath:string, price: number){
        this.name = name;
        this.hsn_code = hsn_code;
        this.description = desc;
        this.imagePath = imagePath;
        this.price = price;
    }
}