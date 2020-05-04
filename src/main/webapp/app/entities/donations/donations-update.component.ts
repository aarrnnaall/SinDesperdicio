import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDonations, Donations } from 'app/shared/model/donations.model';
import { DonationsService } from './donations.service';
import { INeeddonation } from 'app/shared/model/needdonation.model';
import { NeeddonationService } from 'app/entities/needdonation/needdonation.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';

type SelectableEntity = INeeddonation | IRole;

@Component({
  selector: 'jhi-donations-update',
  templateUrl: './donations-update.component.html'
})
export class DonationsUpdateComponent implements OnInit {
  isSaving = false;
  needdonations: INeeddonation[] = [];
  roles: IRole[] = [];

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    date: [],
    latitud: [],
    longitud: [],
    availabilityday: [],
    availabilitytime: [],
    statuseat: [],
    statusdrive: [],
    needdonations: [],
    donor: []
  });

  constructor(
    protected donationsService: DonationsService,
    protected needdonationService: NeeddonationService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ donations }) => {
      if (!donations.id) {
        const today = moment().startOf('day');
        donations.date = today;
      }

      this.updateForm(donations);

      this.needdonationService.query().subscribe((res: HttpResponse<INeeddonation[]>) => (this.needdonations = res.body || []));

      this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
    });
  }

  updateForm(donations: IDonations): void {
    this.editForm.patchValue({
      id: donations.id,
      description: donations.description,
      date: donations.date ? donations.date.format(DATE_TIME_FORMAT) : null,
      latitud: donations.latitud,
      longitud: donations.longitud,
      availabilityday: donations.availabilityday,
      availabilitytime: donations.availabilitytime,
      statuseat: donations.statuseat,
      statusdrive: donations.statusdrive,
      needdonations: donations.needdonations,
      donor: donations.donor
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const donations = this.createFromForm();
    if (donations.id !== undefined) {
      this.subscribeToSaveResponse(this.donationsService.update(donations));
    } else {
      this.subscribeToSaveResponse(this.donationsService.create(donations));
    }
  }

  private createFromForm(): IDonations {
    return {
      ...new Donations(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      latitud: this.editForm.get(['latitud'])!.value,
      longitud: this.editForm.get(['longitud'])!.value,
      availabilityday: this.editForm.get(['availabilityday'])!.value,
      availabilitytime: this.editForm.get(['availabilitytime'])!.value,
      statuseat: this.editForm.get(['statuseat'])!.value,
      statusdrive: this.editForm.get(['statusdrive'])!.value,
      needdonations: this.editForm.get(['needdonations'])!.value,
      donor: this.editForm.get(['donor'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDonations>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: INeeddonation[], option: INeeddonation): INeeddonation {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
