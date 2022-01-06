import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {WashType} from '../models/washtype.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WashTypeService {
  private washTypeUrl = environment.backendUrl + 'mobile/washtypes';

  constructor(private http: HttpClient) {}

  getLocationWashTypes(locationID: number): Observable<WashType[]> {
    return this.http.get<WashType[]>(this.washTypeUrl + `/byLocation/${locationID}`, { withCredentials: true});
  }
}
