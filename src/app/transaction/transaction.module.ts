import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionPage } from './transaction.page';
import {TransactionRoutingModule} from './transaction-routing.module';

@NgModule({
  providers: [DatePipe],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TransactionRoutingModule,

  ],
  declarations: [TransactionPage]
})
export class TransactionModule {}
