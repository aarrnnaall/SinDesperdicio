import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core/auth/account.service';
import { IDetailDriver, DetailDriver } from 'app/shared/model/detail-driver.model';
import { DetailDriverService } from './detail-driver.service_user';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';

@Component({
  selector: 'jhi-detail-driver-update',
  templateUrl: './detail-driver-update.component_user.html'
})
export class DetailDriverUpdateComponent implements OnInit {
  isSaving = false;
  drives: IRole[] = [];
  day: any = '';
  hora: any;
  account: any;
  authSubscription?: Subscription;
  editForm = this.fb.group({
    id: [],
    availabilityday: [],
    starttime: [],
    endtime: [],
    availabilitytime: [],
    drive: []
  });

  constructor(
    protected detailDriverService: DetailDriverService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.activatedRoute.data.subscribe(({ detailDriver }) => {
      this.updateForm(detailDriver);
      this.roleService
        .query({ filter: 'rol-is-null' })
        .pipe(
          map((res: HttpResponse<IRole[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRole[]) => {
          if (!detailDriver.drive || !detailDriver.drive.id) {
            this.drives = resBody;
          } else {
            this.roleService
              .find(detailDriver.drive.id)
              .pipe(
                map((subRes: HttpResponse<IRole>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRole[]) => (this.drives = concatRes));
          }
        });
    });
  }
  filter(login: string): any {
    return this.drives.filter(x => x.user?.login === login);
  }
  updateForm(detailDriver: IDetailDriver): void {
    this.editForm.patchValue({
      id: detailDriver.id,
      availabilityday: detailDriver.availabilityday,
      availabilitytime: detailDriver.availabilitytime,
      drive: detailDriver.drive
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detailDriver = this.createFromForm();
    if (detailDriver.id !== undefined) {
      this.subscribeToSaveResponse(this.detailDriverService.update(detailDriver));
    } else {
      this.subscribeToSaveResponse(this.detailDriverService.create(detailDriver));
    }
  }

  private createFromForm(): IDetailDriver {
    if (this.day === '') {
      this.day = this.editForm.get(['availabilityday'])!.value;
    }
    if (this.editForm.get(['starttime'])!.value == null && this.editForm.get(['endtime'])!.value == null) {
      this.hora = this.editForm.get(['availabilitytime'])!.value;
    } else {
      this.hora = this.editForm.get(['starttime'])!.value + '-' + this.editForm.get(['endtime'])!.value;
    }
    return {
      ...new DetailDriver(),
      id: this.editForm.get(['id'])!.value,
      availabilityday: this.day,
      availabilitytime: this.hora,
      drive: this.filter(this.account.login)[0]
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetailDriver>>): void {
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
