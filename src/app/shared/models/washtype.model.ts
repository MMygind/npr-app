import {LocationModel} from './location.model';

export interface WashType {
  id?: number;
  name: string;
  price: number;
  location?: LocationModel;
}
