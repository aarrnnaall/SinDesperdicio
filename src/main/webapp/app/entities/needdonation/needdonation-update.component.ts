import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { INeeddonation, Needdonation } from 'app/shared/model/needdonation.model';
import { NeeddonationService } from './needdonation.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';

@Component({
  selector: 'jhi-needdonation-update',
  templateUrl: './needdonation-update.component.html'
})
export class NeeddonationUpdateComponent implements OnInit {
  isSaving = false;
  roles: IRole[] = [];

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    datestart: [],
    dateend: [],
    availabilityday: [],
    availabilitytime: [],
    latitud: [],
    longitud: [],
    duration: [],
    intervalduration: [],
    cantpeople: [],
    point: []
  });

  constructor(
    protected needdonationService: NeeddonationService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ needdonation }) => {
      if (!needdonation.id) {
        const today = moment().startOf('day');
        needdonation.datestart = today;
        needdonation.dateend = today;
      }

      this.updateForm(needdonation);

      this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
    });
  }

  updateForm(needdonation: INeeddonation): void {
    this.editForm.patchValue({
      id: needdonation.id,
      description: needdonation.description,
      datestart: needdonation.datestart ? needdonation.datestart.format(DATE_TIME_FORMAT) : null,
      dateend: needdonation.dateend ? needdonation.dateend.format(DATE_TIME_FORMAT) : null,
      availabilityday: needdonation.availabilityday,
      availabilitytime: needdonation.availabilitytime,
      latitud: needdonation.latitud,
      longitud: needdonation.longitud,
      duration: needdonation.duration,
      intervalduration: needdonation.intervalduration,
      cantpeople: needdonation.cantpeople,
      point: needdonation.point
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const needdonation = this.createFromForm();
    if (needdonation.id !== undefined) {
      this.subscribeToSaveResponse(this.needdonationService.update(needdonation));
    } else {
      this.subscribeToSaveResponse(this.needdonationService.create(needdonation));
    }
  }

  private createFromForm(): INeeddonation {
    return {
      ...new Needdonation(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      datestart: this.editForm.get(['datestart'])!.value ? moment(this.editForm.get(['datestart'])!.value, DATE_TIME_FORMAT) : undefined,
      dateend: this.editForm.get(['dateend'])!.value ? moment(this.editForm.get(['dateend'])!.value, DATE_TIME_FORMAT) : undefined,
      availabilityday: this.editForm.get(['availabilityday'])!.value,
      availabilitytime: this.editForm.get(['availabilitytime'])!.value,
      latitud: this.editForm.get(['latitud'])!.value,
      longitud: this.editForm.get(['longitud'])!.value,
      duration: this.editForm.get(['duration'])!.value,
      intervalduration: this.editForm.get(['intervalduration'])!.value,
      cantpeople: this.editForm.get(['cantpeople'])!.value,
      point: this.editForm.get(['point'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INeeddonation>>): void {
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

  trackById(index: number, item: IRole): any {
    return item.id;
  }
}
