
export class Product {
    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public price: number;
    public amount: number;

    constructor(name: string,desc: string, imagePath:string, price: number, amount: number){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.price = price;
        this.amount = amount;

    }
}