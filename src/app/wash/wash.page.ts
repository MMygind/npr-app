import {AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {LocationService} from '../shared/services/location.service';
import {LocationModel} from '../shared/models/location.model';
import {WashType} from '../shared/models/washtype.model';
import {WashTypeService} from '../shared/services/washtype.service';
import {ViewWillEnter} from '@ionic/angular';
import {SwiperComponent} from 'swiper/angular';
import {Transaction} from "../shared/models/transaction.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wash',
  templateUrl: 'wash.page.html',
  styleUrls: ['wash.page.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class WashPage implements OnInit, AfterContentChecked, ViewWillEnter {

  readonly LOCATION_SLIDE: number = 0;
  readonly WASHTYPE_SLIDE: number = 1;
  readonly PAYMENT_METHOD_SLIDE: number = 2;
  readonly OTHER_PAYMENT_SLIDE: number = 3;
  readonly CHECK_PLATE_SLIDE: number = 4;
  readonly CONFIRMATION_SLIDE: number = 5;


  @ViewChild('swiper') swiper: SwiperComponent;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false,
    autoHeight: true,
  };

  locations: LocationModel[];
  selectedLocation: LocationModel;
  washTypes: WashType[];
  selectedWashType: WashType;
  finalTransaction: Transaction;
  paymentMethod: string;
  waitingForPlateDetection = false;
  noMatchingPlateDetected = false;

  constructor(private locationService: LocationService,
              private washTypeService: WashTypeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initializeFirstSlide();
  }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  ionViewWillEnter(): void {
    this.abort();
  }

  initializeFirstSlide() {
    this.locationService.getCompanyLocations()
      .subscribe((locations) => {
        this.locations = locations;
      });
  }

  public selectLocation(location: LocationModel) {
    this.selectedLocation = location;
    this.washTypeService.getLocationWashTypes(this.selectedLocation.id)
      .subscribe((washTypes) => {
        this.washTypes = washTypes;
        this.swiper.swiperRef.slideTo(this.WASHTYPE_SLIDE);
      });
  }

  public selectWashType(washType: WashType) {
    this.selectedWashType = washType;
    this.swiper.swiperRef.slideTo(this.PAYMENT_METHOD_SLIDE);
  }

  public abort() {
    this.selectedLocation = undefined;
    this.selectedWashType = undefined;
    this.swiper.swiperRef.slideTo(this.LOCATION_SLIDE);
    this.initializeFirstSlide();
  }

  payWithPlate() {
    this.waitingForPlateDetection = true;
    this.swiper.swiperRef.slideTo(this.CHECK_PLATE_SLIDE);
  }

  payWithoutPlate() {
    this.swiper.swiperRef.slideTo(this.OTHER_PAYMENT_SLIDE);
  }

  payWithCard() {
    this.paymentMethod = 'kort';
    this.swiper.swiperRef.slideTo(this.CONFIRMATION_SLIDE);
  }

  payWithMobile() {
    this.paymentMethod = 'mobil';
    this.swiper.swiperRef.slideTo(this.CONFIRMATION_SLIDE);
  }

  confirmPayment() {
    this.abort();
    this.router.navigate(['tabs']);
  }
}
