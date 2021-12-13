import {Component, OnInit} from '@angular/core';
import {LocationService} from '../shared/services/location.service';
import {LocationModel} from '../shared/models/location.model';
import {WashType} from '../shared/models/washtype.model';
import {WashTypeService} from '../shared/services/washtype.service';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-wash',
  templateUrl: 'wash.page.html',
  styleUrls: ['wash.page.scss']
})
export class WashPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false,
  };

  locations: LocationModel[];
  selectedLocation: LocationModel;
  washTypes: WashType[];
  selectedWashType: WashType;

  constructor(private locationService: LocationService,
              private washTypeService: WashTypeService) {
  }

  ngOnInit(): void {
    this.locationService.getCompanyLocations()
      .subscribe((locations) => this.locations = locations);
  }

  public selectLocation(location: LocationModel, slides: IonSlides, index: number) {
    this.selectedLocation = location;
    this.washTypeService.getLocationWashTypes(this.selectedLocation.id)
      .subscribe((washTypes) => this.washTypes = washTypes);
    slides.slideTo(index);
  }

  public selectWashType(washType: WashType, slides: IonSlides, index: number) {
    this.selectedWashType = washType;
    slides.slideTo(index);
  }
}
