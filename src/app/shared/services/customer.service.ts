import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerUrl = environment.backendUrl + 'customers';

  constructor(private http: HttpClient) { }

}
