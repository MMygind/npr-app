import {LocationModel} from '../models/location.model';
import {LicensePlate} from '../models/licenseplate.model';
import {WashType} from '../models/washtype.model';

export interface CreateTransactionDto {
  washType: WashType;
  location: LocationModel;
  licensePlate?: LicensePlate;
}
