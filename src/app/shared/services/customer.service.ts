import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private customerUrl = environment.backendUrl + 'customers';

  constructor(private http: HttpClient) {
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.customerUrl + '/1'); //Hard coded ID so far
  }


}
