import {LocationModel} from './location.model';

export interface Company {
  id?: number;
  name: string;
  creationDate: Date;
  phoneNumber: string;
  email: string;
  locations: LocationModel[];
}
