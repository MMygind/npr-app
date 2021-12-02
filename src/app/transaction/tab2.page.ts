import {Component, OnInit} from '@angular/core';
import {TransactionData} from '../shared/models/transaction.model';
import {TransactionService} from '../shared/services/transaction.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  dataSource: TransactionData | undefined;
  page = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  private getAllTransactions(infiniteScroll?): void {
    this.transactionService.getAllTransactions(1, 5).pipe(map((transactionData: TransactionData) => this.dataSource = transactionData)).subscribe();

    if (infiniteScroll) {
      infiniteScroll.target.complete();
    }
  }

  //WORK IN PROGRESS, IGNORER INDTIL VIDERE
  public loadMore(infiniteScroll) {
    this.page ++;
    const maximumPages = this.dataSource.meta.totalPages;
    this.getAllTransactions(infiniteScroll);

    if (this.page === maximumPages) {
      infiniteScroll.target.disabled = true;
    }
  }

}
