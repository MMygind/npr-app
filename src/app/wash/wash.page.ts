import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from '../shared/services/location.service';
import {LocationModel} from '../shared/models/location.model';
import {WashType} from '../shared/models/washtype.model';
import {WashTypeService} from '../shared/services/washtype.service';
import {IonSlides, ViewWillEnter} from '@ionic/angular';

@Component({
  selector: 'app-wash',
  templateUrl: 'wash.page.html',
  styleUrls: ['wash.page.scss']
})
export class WashPage implements OnInit, ViewWillEnter {

  @ViewChild('slides') slides: IonSlides;

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
        this.updateSlides();
      });
  }

  updateSlides() {
    setTimeout(() => {
      this.slides.update();
    }, 5);
  }

  public selectLocation(location: LocationModel) {
    this.selectedLocation = location;
    this.washTypeService.getLocationWashTypes(this.selectedLocation.id)
      .subscribe((washTypes) => {
        this.washTypes = washTypes;
        this.slides.slideTo(1);
        this.updateSlides();
      });
  }

  public selectWashType(washType: WashType) {
    this.selectedWashType = washType;
    this.slides.slideNext();
  }

  public abort() {
    this.selectedLocation = undefined;
    this.selectedWashType = undefined;
    this.slides.slideTo(0);
    this.initializeFirstSlide();
  }
}
