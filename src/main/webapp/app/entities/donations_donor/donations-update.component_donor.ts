import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IDonations, Donations } from 'app/shared/model/donations.model';
import { DonationsService } from './donations.service_donor';
import { INeeddonation } from 'app/shared/model/needdonation.model';
import { NeeddonationService } from 'app/entities/needdonation/needdonation.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';
import { TipoEat } from 'app/shared/model/enumerations/tipo-eat.model';
import { TipoDrive } from 'app/shared/model/enumerations/tipo-drive.model';
import { AccountService } from 'app/core/auth/account.service';
import { IEat, Eat } from '../../shared/model/eat.model';
import { EatService } from '../../entities/eat_donation/eat.service_donation';
import { TipoCate } from 'app/shared/model/enumerations/tipo-cate.model';
import { JhiEventManager } from 'ng-jhipster';
type SelectableEntity = INeeddonation | IRole;

@Component({
  selector: 'jhi-donations-update',
  templateUrl: './donations-update.component_donor.html'
})
export class DonationsUpdateComponent implements OnInit {
  isSaving = false;
  account: any;
  donations?: IDonations[];
  day: string="";
  hora: string="";
  needdonations: INeeddonation[] = [];
  roles: IRole[] = [];
  authSubscription?: Subscription;
  eventSubscriber?: Subscription;
  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    date: [],
    latitud: [],
    longitud: [],
    availabilityday: [],
    starttime: [],
    endtime: [],
    availabilitytime: [],
    statuseat: [],
    statusdrive: [],
    needdonations: [],
    donor: [],
    eats: this.fb.array([])
  });

  constructor(
    protected donationsService: DonationsService,
    protected needdonationService: NeeddonationService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    protected eatService: EatService,
    protected eventManager: JhiEventManager
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ donations }) => {
      if (!donations.id) {
        const today = moment().startOf('day');
        donations.date = today;
      }
      this.updateForm(donations);

    });
    this.donationsService.query().subscribe((res: HttpResponse<IDonations[]>) => (this.donations = res.body || []));

    this.needdonationService.query().subscribe((res: HttpResponse<INeeddonation[]>) => (this.needdonations = res.body || []));

    this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));

    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
  filterdonations(): any{
    return this.donations?.filter(x=>x.donor?.user?.login===this.account.login);
  }
  registerChangeInDonations(): void {
    this.eventSubscriber = this.eventManager.subscribe('donationsListModification', () => this.donationsService.query().subscribe((res: HttpResponse<IDonations[]>) => (this.donations = res.body || [])));
  }
  get eats(): any {
    return this.editForm.get('eats') as FormArray;
  }
  private createFromEat(category: TipoCate, canteat: number,donations: IDonations): IEat {
    return {
      ...new Eat(),
      category: category,
      canteat: canteat,
      donations: donations
    };
  }
  protected subscribeToSaveResponseEat(result: Observable<HttpResponse<IEat>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  Addeats(): any {
    const eatfb = this.fb.group({
      category: [],
      canteat: [],
      donations: []
    });
    this.eats.push(eatfb);
  }
  Removeeats(indice: number): any {
    this.eats.removeAt(indice);
  }
  filter(login: string): any{
    return this.roles.filter(x=>x.user?.login===login);
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
      //this.subscribeToSaveResponse(this.donationsService.create(donations));
    }
    for (const elemento of this.eats.controls) {
      this.subscribeToSaveResponseEat(
        this.eatService.create(
          this.createFromEat(elemento.get(['category']).value, elemento.get(['canteat']).value,donations)
        )
      );
    }

  }

  private createFromForm(): IDonations {
    if (this.day == '') {
      this.day = this.editForm.get(['availabilityday'])!.value;
    }
    if (this.editForm.get(['starttime'])!.value == null && this.editForm.get(['endtime'])!.value == null){
      this.hora = this.editForm.get(['availabilitytime'])!.value;
    } else{
      this.hora = this.editForm.get(['starttime'])!.value +"-"+ this.editForm.get(['endtime'])!.value;
    }
    return {
      ...new Donations(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      latitud: this.editForm.get(['latitud'])!.value,
      longitud: this.editForm.get(['longitud'])!.value,
      availabilityday: this.day,
      availabilitytime: this.hora,
      statuseat: TipoEat.Cargado,
      statusdrive: TipoDrive.Cargado,
      needdonations: this.editForm.get(['needdonations'])!.value,
      donor: this.filter(this.account.login)[0]
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
  trackId(index: number, item: IDonations): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
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
