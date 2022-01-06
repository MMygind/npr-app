import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LocationModel} from '../models/location.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locationUrl = environment.backendUrl + 'mobile/locations';

  constructor(private http: HttpClient) {}

  getCompanyLocations(): Observable<LocationModel[]> {
    return this.http.get<LocationModel[]>(this.locationUrl + '/thisCompany', { withCredentials: true});
  }
}
