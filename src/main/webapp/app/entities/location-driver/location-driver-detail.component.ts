import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocationDriver } from 'app/shared/model/location-driver.model';

@Component({
  selector: 'jhi-location-driver-detail',
  templateUrl: './location-driver-detail.component.html'
})
export class LocationDriverDetailComponent implements OnInit {
  locationDriver: ILocationDriver | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ locationDriver }) => (this.locationDriver = locationDriver));
  }

  previousState(): void {
    window.history.back();
  }
}
