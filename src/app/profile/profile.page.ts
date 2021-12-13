import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../shared/services/customer.service';
import {Customer} from '../shared/models/customer.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  loggedInUser: Customer | undefined;

  constructor(private customerService: CustomerService) {}

  public getCustomerData(): void {
    this.customerService.getCustomerById(1).subscribe(customer => this.loggedInUser = customer);
  }

  ngOnInit(): void {
    this.getCustomerData();
  }

}
