import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from '../shared/services/location.service';
import {LocationModel} from '../shared/models/location.model';
import {WashType} from '../shared/models/washtype.model';
import {WashTypeService} from '../shared/services/washtype.service';
import {ViewWillEnter} from '@ionic/angular';
import {SwiperComponent} from 'swiper/angular';

@Component({
  selector: 'app-wash',
  templateUrl: 'wash.page.html',
  styleUrls: ['wash.page.scss']
})
export class WashPage implements OnInit, ViewWillEnter {

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

  constructor(private locationService: LocationService,
              private washTypeService: WashTypeService) {
  }

  ngOnInit(): void {
    this.initializeFirstSlide();
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
        this.swiper.swiperRef.slideNext();
      });
  }

  public selectWashType(washType: WashType) {
    this.selectedWashType = washType;
    this.swiper.swiperRef.slideNext();
  }

  public abort() {
    this.selectedLocation = undefined;
    this.selectedWashType = undefined;
    this.swiper.swiperRef.slideTo(0);
    this.initializeFirstSlide();
  }

}
