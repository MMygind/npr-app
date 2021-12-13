import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../shared/services/customer.service';
import {Customer} from '../shared/models/customer.model';
import {LicensePlate} from '../shared/models/licenseplate.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  loggedInUser: Customer | undefined;
  plateList: LicensePlate[];

  constructor(private customerService: CustomerService) {}

  public getCustomerData(): void {
    this.plateList = [];
    this.customerService.getCustomerById(1).subscribe(customer => {
      this.loggedInUser = customer;
      this.plateList = JSON.parse(JSON.stringify(customer.licensePlates));
      console.log(JSON.stringify(customer.licensePlates));
    });
  }

  ngOnInit(): void {
    this.getCustomerData();
  }

}
