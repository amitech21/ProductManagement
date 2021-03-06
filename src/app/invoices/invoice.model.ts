import { ProductInvoice } from '../products/products_invoice.model';
import { Customer } from '../customers/customer.model';

export class Invoice {
    public id: number;
    public created_date_time: string;
    public updated_date_time: string;
    public invoice_date: string;
    public customer: Customer;
    public products: ProductInvoice[];
    public products_price: number;
    public cgst: number;
    public sgst: number;
    public igst: number;
    public discount: number;
    public total_price: number;


    constructor(
        id: number, 
        created_date_time: string,
        updated_date_time: string,
        invoice_date: string,
        customer: Customer,
        products:ProductInvoice[], 
        products_price: number,
        cgst: number,
        sgst: number,
        igst: number,
        discount: number,
        total_price: number
        ){
        this.id = id;
        this.created_date_time = created_date_time;
        this.updated_date_time = updated_date_time;
        this.invoice_date = invoice_date;
        this.customer = customer;
        this.products = products;
        this.products_price = products_price;
        this.cgst = cgst;
        this.sgst = sgst;
        this.igst = igst;
        this.discount = discount;
        this.total_price = total_price;
    }
}