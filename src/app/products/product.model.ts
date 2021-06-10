
export class Product {
    public id: number;
    public name: string;
    public hsn_code: string;
    public description: string;
    public imagePath: string;
    public price: number;

    constructor(id: number, name: string, hsn_code: string, desc: string, imagePath:string, price: number){
        this.id = id;
        this.name = name;
        this.hsn_code = hsn_code;
        this.description = desc;
        this.imagePath = imagePath;
        this.price = price;
    }
}