

export class ProductInvoice {
    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public price: number;
    public quantity: number;
    public selected: String;

    constructor(id: number, name: string,desc: string, imagePath:string, price: number, quantity: number, selected: string){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.price = price;
        this.quantity = quantity;
        this.selected = selected;  
    }
}