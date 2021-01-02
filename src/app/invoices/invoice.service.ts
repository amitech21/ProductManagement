import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Customer } from '../customers/customer.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
 export class InvoiceService{

    constructor(private http: HttpClient){}

    getCustomers(cust_name_data: string): Observable<any> {
        return this.http.get<Customer[]>(environment.webAppEndPoint + '/customers/listByName/' + cust_name_data);
    }
}