import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocationDriver } from 'app/shared/model/location-driver.model';
import { LocationDriverService } from './location-driver.service';

@Component({
  templateUrl: './location-driver-delete-dialog.component.html'
})
export class LocationDriverDeleteDialogComponent {
  locationDriver?: ILocationDriver;

  constructor(
    protected locationDriverService: LocationDriverService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.locationDriverService.delete(id).subscribe(() => {
      this.eventManager.broadcast('locationDriverListModification');
      this.activeModal.close();
    });
  }
}
