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

  getAllLicensePlates(): Observable<LicensePlate[]> {
    return this.http.get<LicensePlate[]>(this.plateUrl);
  }

  createLicensePlate(licensePlate: LicensePlate): Observable<LicensePlate> {
    return this.http.post<LicensePlate>(this.plateUrl, licensePlate);
  }
}
