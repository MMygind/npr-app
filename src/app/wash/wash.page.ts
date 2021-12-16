import {AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {LocationService} from '../shared/services/location.service';
import {LocationModel} from '../shared/models/location.model';
import {WashType} from '../shared/models/washtype.model';
import {WashTypeService} from '../shared/services/washtype.service';
import {ViewWillEnter} from '@ionic/angular';
import {SwiperComponent} from 'swiper/angular';
import {Router} from '@angular/router';
import {TransactionService} from '../shared/services/transaction.service';
import {LicensePlate} from '../shared/models/licenseplate.model';
import {CreateTransactionDto} from '../shared/dtos/create-transaction.dto';

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
    speed: 1,
    allowTouchMove: false,
    autoHeight: true,
  };

  locations: LocationModel[];
  selectedLocation: LocationModel;
  washTypes: WashType[];
  selectedWashType: WashType;
  paymentMethod: string;
  waitingForPlateDetection = false;
  noMatchingPlateDetected = false;
  foundLicensePlate: LicensePlate;

  constructor(private locationService: LocationService,
              private washTypeService: WashTypeService,
              private transactionService: TransactionService,
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
    this.reset();
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

  public reset() {
    this.selectedLocation = undefined;
    this.selectedWashType = undefined;
    this.foundLicensePlate = undefined;
    this.paymentMethod = undefined;
    this.waitingForPlateDetection = false;
    this.noMatchingPlateDetected = false;
    this.swiper.swiperRef.slideTo(this.LOCATION_SLIDE);
    this.initializeFirstSlide();
  }

  payWithPlate() {
    this.waitingForPlateDetection = true;
    this.swiper.swiperRef.slideTo(this.CHECK_PLATE_SLIDE);
    this.transactionService.getMatchingPlateAtLocation(this.selectedLocation.id)
      .subscribe((plate) => {
        this.waitingForPlateDetection = false;
        if (plate) {
          this.foundLicensePlate = plate;
          this.paymentMethod = `nummerplade ${plate.licensePlate}`;
          this.swiper.swiperRef.slideTo(this.CONFIRMATION_SLIDE);
        } else {
          this.noMatchingPlateDetected = true;
          this.swiper.updateSwiper({});
        }
    });
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
    const dto: CreateTransactionDto = {
      washType: this.selectedWashType,
      location: this.selectedLocation,
    };
    dto.licensePlate = this.foundLicensePlate ?? undefined;
    this.transactionService.createTransaction(dto).subscribe((transaction) => {
      this.reset();
      this.router.navigate(['tabs']);
    });
  }
}
