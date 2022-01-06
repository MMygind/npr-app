import {WashType} from './washtype.model';
import {Company} from './company.model';

export interface LocationModel {
  id?: number;
  company: Company;
  name: string;
  address: string;
  postalCode: number;
  city: string;
  latitude?: number;
  longitude?: number;
  washTypes: WashType[];
}
