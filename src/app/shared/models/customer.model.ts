import {Subscription} from './subscription.model';

export interface Customer {
  id?: number;
  name: string;
  email: string;
  creationDate: Date;
  phoneNumber: string;
  subscription: Subscription;
  licensePlates: string[];
  active: boolean;
}
