import {LicensePlate} from './licenseplate.model';
import {WashType} from './washtype.model';
import {LocationModel} from './location.model';
import {Customer} from './customer.model';

export interface Transaction {
  id?: number;
  washType: WashType;
  location: LocationModel;
  licensePlate?: LicensePlate;
  customer: Customer;
  purchasePrice: number;
  timestamp: Date;
  imageURL: string;
}

export interface TransactionData {
  items: Transaction[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}
