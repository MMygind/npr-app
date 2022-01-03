import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import CreateCustomerDto from '../dtos/create-customer.dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private authenticationUrl = environment.backendUrl + 'mobile/authentication';

  constructor(private http: HttpClient) { }

  registerNewCustomer(customer: CreateCustomerDto) {
    return this.http.post(this.authenticationUrl + '/register', customer);
  }
}
