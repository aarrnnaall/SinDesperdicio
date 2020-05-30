import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDetailDriver, DetailDriver } from 'app/shared/model/detail-driver.model';
import { DetailDriverService } from './detail-driver.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';

@Component({
  selector: 'jhi-detail-driver-update',
  templateUrl: './detail-driver-update.component.html'
})
export class DetailDriverUpdateComponent implements OnInit {
  isSaving = false;
  drives: IRole[] = [];

  editForm = this.fb.group({
    id: [],
    availabilityday: [],
    availabilitytime: [],
    transportation: [],
    drive: []
  });

  constructor(
    protected detailDriverService: DetailDriverService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
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

  updateForm(detailDriver: IDetailDriver): void {
    this.editForm.patchValue({
      id: detailDriver.id,
      availabilityday: detailDriver.availabilityday,
      availabilitytime: detailDriver.availabilitytime,
      transportation: detailDriver.transportation,
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
    return {
      ...new DetailDriver(),
      id: this.editForm.get(['id'])!.value,
      availabilityday: this.editForm.get(['availabilityday'])!.value,
      availabilitytime: this.editForm.get(['availabilitytime'])!.value,
      transportation: this.editForm.get(['transportation'])!.value,
      drive: this.editForm.get(['drive'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetailDriver>>): void {
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
