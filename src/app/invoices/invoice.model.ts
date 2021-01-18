import { ProductInvoice } from '../products/products_invoice.model';
import { Customer } from '../customers/customer.model';

export class Invoice {
    public id: number;
    public created_date_time: string;
    public customer: Customer;
    public products: ProductInvoice[];
    public gst: number;
    public discount: number;
    public total_price: number;


    constructor(
        id: number, 
        created_date_time: string,
        customer: Customer,
        products:ProductInvoice[], 
        gst: number,
        discount: number,
        total_price: number
        ){
        this.id = id;
        this.created_date_time = created_date_time;
        this.customer = customer;
        this.products = products;
        this.gst = gst;
        this.discount = discount;
        this.total_price = total_price;
    }
}