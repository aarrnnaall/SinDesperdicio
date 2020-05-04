import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocationDriver, LocationDriver } from 'app/shared/model/location-driver.model';
import { LocationDriverService } from './location-driver.service';
import { IDetailDriver } from 'app/shared/model/detail-driver.model';
import { DetailDriverService } from 'app/entities/detail-driver/detail-driver.service';

@Component({
  selector: 'jhi-location-driver-update',
  templateUrl: './location-driver-update.component.html'
})
export class LocationDriverUpdateComponent implements OnInit {
  isSaving = false;
  detaildrivers: IDetailDriver[] = [];

  editForm = this.fb.group({
    id: [],
    latitud: [],
    longitud: [],
    detaildriver: []
  });

  constructor(
    protected locationDriverService: LocationDriverService,
    protected detailDriverService: DetailDriverService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ locationDriver }) => {
      this.updateForm(locationDriver);

      this.detailDriverService.query().subscribe((res: HttpResponse<IDetailDriver[]>) => (this.detaildrivers = res.body || []));
    });
  }

  updateForm(locationDriver: ILocationDriver): void {
    this.editForm.patchValue({
      id: locationDriver.id,
      latitud: locationDriver.latitud,
      longitud: locationDriver.longitud,
      detaildriver: locationDriver.detaildriver
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const locationDriver = this.createFromForm();
    if (locationDriver.id !== undefined) {
      this.subscribeToSaveResponse(this.locationDriverService.update(locationDriver));
    } else {
      this.subscribeToSaveResponse(this.locationDriverService.create(locationDriver));
    }
  }

  private createFromForm(): ILocationDriver {
    return {
      ...new LocationDriver(),
      id: this.editForm.get(['id'])!.value,
      latitud: this.editForm.get(['latitud'])!.value,
      longitud: this.editForm.get(['longitud'])!.value,
      detaildriver: this.editForm.get(['detaildriver'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocationDriver>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDetailDriver): any {
    return item.id;
  }
}
