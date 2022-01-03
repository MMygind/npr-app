import {Subscription} from './subscription.model';
import {LicensePlate} from './licenseplate.model';

export interface Customer {
  id?: number;
  name: string;
  email: string;
  creationDate: Date;
  phoneNumber: string;
  subscription: Subscription;
  licensePlates: LicensePlate[];
  active: boolean;
}
