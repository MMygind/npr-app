import {Component, OnInit} from '@angular/core';
import {TransactionData} from '../shared/models/transaction.model';
import {TransactionService} from '../shared/services/transaction.service';
import {map} from 'rxjs/operators';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  dataSource: TransactionData | undefined;
  newItems: TransactionData | undefined;
  page = 1;

  constructor(private transactionService: TransactionService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  private getAllTransactions(): void {
    this.transactionService.getAllTransactions(1, 10).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe();
  }

  public loadData(event) {
    this.page ++;
    const maximumPages = this.dataSource.meta.totalPages;

    const items = this.dataSource.items;
    this.transactionService.getAllTransactions(this.page, 10).pipe(map((transactionData: TransactionData) => this.newItems = transactionData)).subscribe();


    if (this.page === maximumPages) {
      event.target.disabled = true;
    }
    setTimeout(() => {
      console.log('Done');

      [].push.apply(items, this.newItems.items);
      this.dataSource.items = items;
      event.target.complete();
    }, 500);
  }

  public getDateWithFormat(date: Date): string {
    const dateWithFormat = this.datePipe.transform(date, 'dd-MM-yyyy');

    if(dateWithFormat != null) {
      return dateWithFormat;
    }
    else {
      return '';
    }
  }

}
