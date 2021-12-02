import {Customer} from './customer.model';

export interface LicensePlate {
  id?: number;
  customer: Customer;
  licensePlate: string;
}
