import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AccountService } from 'app/core/auth/account.service';
import { INeeddonation, Needdonation } from 'app/shared/model/needdonation.model';
import { NeeddonationService } from './needdonation.service_point';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';
import { Subscription } from 'rxjs';
import { TipoDuration } from 'app/shared/model/enumerations/tipo-duration.model';

@Component({
  selector: 'jhi-needdonation-update',
  templateUrl: './needdonation-update.component_point.html'
})
export class NeeddonationUpdateComponent implements OnInit {
  continua = false;
  unavez = false;
  isSaving = false;
  statusduracion: any;
  intervalo: any;
  roles: IRole[] = [];
  day: any = '';
  account: any;
  hora: any;
  authSubscription?: Subscription;
  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    datestart: [],
    dateend: [],
    availabilityday: [],
    starttime: [],
    endtime: [],
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
    private accountService: AccountService,
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
      this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
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
  Continua(): void {
    if (this.continua) {
      this.continua = false;
    } else {
      this.continua = true;
    }
    this.statusduracion = TipoDuration.Continua;
  }
  Unavez(): void {
    if (this.unavez) {
      this.unavez = false;
    } else {
      this.unavez = true;
    }
    this.statusduracion = TipoDuration.Unavez;
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
  filter(login: string): any {
    return this.roles.filter(x => x.user?.login === login);
  }
  private createFromForm(): INeeddonation {
    if (this.day === '') {
      this.day = this.editForm.get(['availabilityday'])!.value;
    }
    if (this.editForm.get(['starttime'])!.value == null && this.editForm.get(['endtime'])!.value == null) {
      this.hora = this.editForm.get(['availabilitytime'])!.value;
    } else {
      this.hora = this.editForm.get(['starttime'])!.value + '-' + this.editForm.get(['endtime'])!.value;
    }
    if (this.statusduracion == null) {
      this.statusduracion = this.editForm.get(['duration'])!.value;
    }
    if (this.editForm.get(['intervalduration'])!.value == null) {
      this.intervalo = '-';
    } else {
      this.intervalo = this.editForm.get(['intervalduration'])!.value;
    }
    if (this.unavez) {
      this.intervalo = '-';
    }
    return {
      ...new Needdonation(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      datestart: this.editForm.get(['datestart'])!.value ? moment(this.editForm.get(['datestart'])!.value, DATE_TIME_FORMAT) : undefined,
      dateend: this.editForm.get(['dateend'])!.value ? moment(this.editForm.get(['dateend'])!.value, DATE_TIME_FORMAT) : undefined,
      availabilityday: this.day,
      availabilitytime: this.hora,
      latitud: this.editForm.get(['latitud'])!.value,
      longitud: this.editForm.get(['longitud'])!.value,
      duration: this.statusduracion,
      intervalduration: this.intervalo,
      cantpeople: this.editForm.get(['cantpeople'])!.value,
      point: this.filter(this.account.login)[0]
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INeeddonation>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  Addlunes(): void {
    this.day = this.day + ' lunes';
  }
  Addmartes(): void {
    this.day = this.day + ' martes';
  }
  Addmiercoles(): void {
    this.day = this.day + ' miercoles';
  }
  Addjueves(): void {
    this.day = this.day + ' jueves';
  }
  Addviernes(): void {
    this.day = this.day + ' viernes';
  }
  Addsabado(): void {
    this.day = this.day + ' sabado';
  }
  Adddomingo(): void {
    this.day = this.day + ' domingo';
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
