import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../shared/services/customer.service';
import {Customer} from '../shared/models/customer.model';
import {LicensePlate} from '../shared/models/licenseplate.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LicensePlateService} from '../shared/services/licenseplate.service';
import {SubscriptionService} from '../shared/services/subscription.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  loggedInUser: Customer | undefined;
  plateList: LicensePlate[];
  allPlatesList: LicensePlate[] = [];
  plateForm = this.fb.group({
    licensePlate: [null, [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{5}$/)]],
  }, {validator: this.uniquePlateValidator.bind(this)});
  isSubmitted = false;

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private licensePlateService: LicensePlateService,
              private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.getCustomerData();
    this.getAllPlates();
  }

  public getCustomerData(): void {
    this.plateList = [];
    this.customerService.getCustomerById(1).subscribe(customer => {
      this.loggedInUser = customer;
      this.plateList = JSON.parse(JSON.stringify(customer.licensePlates));
    });
  }

  public getAllPlates(): void {
    this.licensePlateService.getAllLicensePlates().subscribe(plates => {
      if (plates)
      {
        this.allPlatesList = plates;
      }
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

    if (this.loggedInUser.subscription === null) {
      this.subscriptionService.getSubscription().subscribe(subscription => {
        this.loggedInUser.subscription = subscription;
        this.customerService.updateCustomer(this.loggedInUser).subscribe();
      });
    }

    this.licensePlateService.createLicensePlate(plateToReturn).subscribe();
    this.plateList.push(this.plateForm.value); //Plate added to list to show the user
    this.allPlatesList.push(this.plateForm.value); //Plate added to list with all plates for unique validation
    this.plateForm.reset();
  }

  private uniquePlateValidator(control: FormControl) {
    this.isSubmitted = true;
    if (this.allPlatesList)
    {
      this.allPlatesList.forEach(plate => {
        if (plate.licensePlate === this.plateForm.value.licensePlate) {
          control.get('licensePlate').setErrors({duplicate: true});
        } else {
          return null;
        }
      });
    }
  }

  get errorControl() {
    return this.plateForm.controls;
  }

}
