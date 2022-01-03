import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {CustomerService} from '../shared/services/customer.service';
import CreateCustomerDto from '../shared/dtos/create-customer.dto';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private customerService: CustomerService) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required,
        Validators.pattern(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/)]],
    });
  }

  ngOnInit() {
  }

  get errorControl() {
    return this.signUpForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.signUpForm.valid) {
      return false;
    } else {
      const customer: CreateCustomerDto = {
        name: this.signUpForm.value.name,
        email: this.signUpForm.value.email,
        phoneNumber: this.signUpForm.value.phoneNumber,
        password: this.signUpForm.value.password,
        active: true,
        companyId: environment.companyId,
      };
      return this.customerService.registerNewCustomer(customer).subscribe();
    }
  }
}
