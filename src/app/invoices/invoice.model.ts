export class Invoice {
    public id: number;
    public name: string;
    public mobile_no: number;
    public address: string;
    public gst_no: number;

    constructor(id: number, name: string,mobile_no: number, address:string, gst_no: number){
        this.id = id;
        this.name = name;
        this.mobile_no = mobile_no;
        this.address = address;
        this.gst_no = gst_no;
    }
}