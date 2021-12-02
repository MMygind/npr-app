import {Company} from './company.model';

export interface WashType {
  id?: number;
  name: string;
  price: number;
  company?: Company;
}
