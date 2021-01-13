import { ProductInvoice } from '../products/products_invoice.model';

export class Invoice {
    public id: number;
    public created_date_time: string;
    public modified_date_time: string;
    public cust_id: number;
    public products: ProductInvoice[];
    public gst: number;
    public discount: number;
    public total_price: number;


    constructor(
        id: number, 
        created_date_time: string,
        modified_date_time: string, 
        cust_id: number,
        products:ProductInvoice[], 
        gst: number,
        discount: number,
        total_price: number
        ){
        this.id = id;
        this.created_date_time = created_date_time;
        this.modified_date_time = modified_date_time;
        this.cust_id = cust_id;
        this.products = products;
        this.gst = gst;
        this.discount = discount;
        this.total_price = total_price;
    }
}