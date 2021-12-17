import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction, TransactionData} from '../models/transaction.model';
import {Injectable} from '@angular/core';
import {LicensePlate} from "../models/licenseplate.model";
import {CreateTransactionDto} from "../dtos/create-transaction.dto";

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  private transactionUrl = environment.backendUrl + 'transactions';

  constructor(private http: HttpClient) {
  }

  getAllTransactions(page: number, size: number): Observable<TransactionData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit,', String(size));

    return this.http.get<TransactionData>(this.transactionUrl + '/byUser', {params});
  }

  getMatchingPlateAtLocation(locationID: number): Observable<LicensePlate> {
    return this.http.get<LicensePlate>(this.transactionUrl + `/checkPlate/${locationID}`);
  }

  createTransaction(dto: CreateTransactionDto): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionUrl, dto);
  }
}
