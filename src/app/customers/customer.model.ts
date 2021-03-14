export class Customer {
    public id: number;
    public name: string;
    public mobile_no: string;
    public address: string;
    public gst_no: string;

    constructor(id: number, name: string,mobile_no: string, address:string, gst_no: string){
        this.id = id;
        this.name = name;
        this.mobile_no = mobile_no;
        this.address = address;
        this.gst_no = gst_no;
    }
}