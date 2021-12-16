import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../shared/services/customer.service';
import {Customer} from '../shared/models/customer.model';
import {LicensePlate} from '../shared/models/licenseplate.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LicensePlateService} from '../shared/services/licenseplate.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  loggedInUser: Customer | undefined;
  plateList: LicensePlate[];
  plateForm = this.fb.group({
    licensePlate: [null, [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{5}$/)]],
  });
  isSubmitted = false;

  constructor(private customerService: CustomerService, private fb: FormBuilder, private licensePlateService: LicensePlateService) {}

  ngOnInit(): void {
    this.getCustomerData();
  }

  public getCustomerData(): void {
    this.plateList = [];
    this.customerService.getCustomerById(1).subscribe(customer => {
      this.loggedInUser = customer;
      this.plateList = JSON.parse(JSON.stringify(customer.licensePlates));
      console.log(JSON.stringify(customer.licensePlates));
    });
  }

  public saveLicensePlate() {
    const plateToReturn: LicensePlate = {
      customer: this.loggedInUser,
      licensePlate: this.plateForm.value.licensePlate,
    };

    this.isSubmitted = true;

    if (!this.plateForm.valid) {
      return false;
    }
    this.licensePlateService.createLicensePlate(plateToReturn).subscribe();
    this.plateList.push(this.plateForm.value);
    this.plateForm.reset();
    console.log(this.plateForm.value);
    console.log(plateToReturn);
    console.log(this.loggedInUser);
  }

  get errorControl() {
    return this.plateForm.controls;
  }

}
