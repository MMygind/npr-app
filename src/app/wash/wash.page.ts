import {Component, OnInit} from '@angular/core';
import {LocationService} from '../shared/services/location.service';
import {LocationModel} from '../shared/models/location.model';

@Component({
  selector: 'app-wash',
  templateUrl: 'wash.page.html',
  styleUrls: ['wash.page.scss']
})
export class WashPage implements OnInit {

  locations: LocationModel[];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getCompanyLocations()
      .subscribe((locations) => this.locations = locations);
  }

}
