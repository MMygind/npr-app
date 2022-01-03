import CreateCustomerDto from '../dtos/create-customer.dto';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private authenticationUrl = environment.backendUrl + 'mobile/authentication';
  private customerUrl = environment.backendUrl + 'customers';

  constructor(private http: HttpClient) { }

  registerNewCustomer(customer: CreateCustomerDto) {
    return this.http.post<CreateCustomerDto>(this.authenticationUrl + '/register', customer);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.customerUrl + '/1'); //Hard coded ID so far
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.customerUrl, customer);
  }
}
