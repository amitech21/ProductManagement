import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Customer } from '../customers/customer.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../products/product.model';

@Injectable({
    providedIn: 'root'
  })
 export class InvoiceService{

    constructor(private http: HttpClient){}

    // /listByPage/{pgNo}/{item_count}
    getCustomersByPage(pgNo: number , item_count: number): Observable<any> {
        return this.http.get<Customer[]>(environment.webAppEndPoint + '/customers/listByPage/'+pgNo+"/"+item_count);
    }

    getCustomersByName(cust_name_data: string): Observable<any> {
        return this.http.get<Customer[]>(environment.webAppEndPoint + '/customers/listByName/' + cust_name_data);
    }

    getCustomersById(cust_id_data: number): Observable<any> {
        return this.http.get<Customer>(environment.webAppEndPoint + '/customers/get/' + cust_id_data);
    }

    getProductsByName(prod_name_data: string): Observable<any> {
        return this.http.get<Product[]>(environment.webAppEndPoint + '/products/listByName/' + prod_name_data);
    }

    getProductsById(prod_id_data: number): Observable<any> {
        return this.http.get<Product>(environment.webAppEndPoint + '/products/get/' + prod_id_data);
    }
}