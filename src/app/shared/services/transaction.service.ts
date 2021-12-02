import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransactionData} from '../models/transaction.model';
import {Injectable} from '@angular/core';

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

    return this.http.get<TransactionData>(this.transactionUrl, {params});
  }
}
