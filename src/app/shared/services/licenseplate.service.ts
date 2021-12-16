import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LicensePlate} from '../models/licenseplate.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LicensePlateService {
  private plateUrl = environment.backendUrl + 'licensePlates';

  constructor(private http: HttpClient) {
  }

  createLicensePlate(licensePlate: LicensePlate): Observable<LicensePlate> {
    console.log(licensePlate.licensePlate + licensePlate.customer.name);
    return this.http.post<LicensePlate>(this.plateUrl, licensePlate);
  }
}
