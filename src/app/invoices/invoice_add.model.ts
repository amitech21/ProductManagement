
export class Invoice_add {
    public name: string;
    public mobile_no: number;
    public address: string;
    public cgst_no: number;
    public sgst_no: number;
    public igst_no: number;

    constructor( name: string,mobile_no: number, address:string, cgst_no: number, sgst_no: number, igst_no: number){
        this.name = name;
        this.mobile_no = mobile_no;
        this.address = address;
        this.cgst_no = cgst_no;
        this.sgst_no = sgst_no;
        this.igst_no = igst_no;
    }
}