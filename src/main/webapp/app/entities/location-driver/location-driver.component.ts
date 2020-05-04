import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocationDriver } from 'app/shared/model/location-driver.model';
import { LocationDriverService } from './location-driver.service';
import { LocationDriverDeleteDialogComponent } from './location-driver-delete-dialog.component';

@Component({
  selector: 'jhi-location-driver',
  templateUrl: './location-driver.component.html'
})
export class LocationDriverComponent implements OnInit, OnDestroy {
  locationDrivers?: ILocationDriver[];
  eventSubscriber?: Subscription;

  constructor(
    protected locationDriverService: LocationDriverService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.locationDriverService.query().subscribe((res: HttpResponse<ILocationDriver[]>) => (this.locationDrivers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLocationDrivers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILocationDriver): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLocationDrivers(): void {
    this.eventSubscriber = this.eventManager.subscribe('locationDriverListModification', () => this.loadAll());
  }

  delete(locationDriver: ILocationDriver): void {
    const modalRef = this.modalService.open(LocationDriverDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.locationDriver = locationDriver;
  }
}
