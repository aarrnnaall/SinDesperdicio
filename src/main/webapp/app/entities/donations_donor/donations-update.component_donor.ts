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
import { BranchService } from 'app/entities/branch_admin/branch.service_admin';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Vectorlayer from 'ol/layer/Vector';
import Vectorsource from 'ol/source/Vector';
type SelectableEntity = INeeddonation | IRole;

@Component({
  selector: 'jhi-donations-update',
  templateUrl: './donations-update.component_donor.html'
})
export class DonationsUpdateComponent implements OnInit {
  isSaving = false;
  account: any;
  donations?: IDonations[];
  day: any = '';
  hora: any;
  needdonations: INeeddonation[] = [];
  roles: IRole[] = [];
  authSubscription?: Subscription;
  eventSubscriber?: Subscription;
  continua = false;
  unavez = false;
  statusduracion: any;
  intervalo: any;
  geocode: any;
  features: any;
  return: any;
  return2: any;

  map: any;
  lat?: number;
  long?: number;
  palabra = '';
  par = true;
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
    duration: [],
    intervalduration: [],
    needdonations: [],
    donor: [],
    eats: this.fb.array([])
  });
  Form = this.fb.group({
    seach: []
  });
  constructor(
    protected donationsService: DonationsService,
    protected needdonationService: NeeddonationService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private accountService: AccountService,
    protected eatService: EatService,
    protected eventManager: JhiEventManager,
    protected branchService: BranchService
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
  filterdonations(): any {
    return this.donations?.filter(x => x.donor?.user?.login === this.account.login);
  }
  registerChangeInDonations(): void {
    this.eventSubscriber = this.eventManager.subscribe('donationsListModification', () =>
      this.donationsService.query().subscribe((res: HttpResponse<IDonations[]>) => (this.donations = res.body || []))
    );
  }
  get eats(): any {
    return this.editForm.get('eats') as FormArray;
  }
  refresh(): void {
    this.loadAllgeocode();
  }
  loadAllgeocode(): void {
    const text = this.Form.get(['seach'])!.value;

    if (text !== null) {
      this.branchService.geocode(text).subscribe((res: HttpResponse<String>) => (this.geocode = res.body || []));
      this.features = this.geocode.features;
    } else {
      this.geocode = null;
    }
  }
  private createFromEat(category: TipoCate, canteat: number, donations: IDonations): IEat {
    return {
      ...new Eat(),
      category,
      canteat,
      donations
    };
  }
  protected subscribeToSaveResponseEat(result: Observable<HttpResponse<IEat>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  Continua(): void {
    if (this.continua) {
      this.continua = false;
    } else {
      this.continua = true;
    }
    this.statusduracion = 'Continua';
  }
  Unavez(): void {
    if (this.unavez) {
      this.unavez = false;
    } else {
      this.unavez = true;
    }
    this.statusduracion = 'Unavez';
  }
  refreshdir(text: string, text2: string): void {
    this.return = text;
    this.return2 = text2;

    const textsplit = text + '';
    const splitted = textsplit.split(',', 2);
    const lat = splitted[0] + '';
    const splitlat = lat.split('.', 2);
    const log = splitted[1] + '';
    const splitlog = log.split('.', 2);

    this.lat = parseFloat(splitlat[0] + splitlat[1]);
    this.long = parseFloat(splitlog[0] + splitlog[1]);
    this.mapscoor(text + '', 18);
  }
  mapscoor(loglat: string, zoom: number): any {
    const splitted = loglat.split(',', 2);
    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([parseFloat(splitted[0]), parseFloat(splitted[1])]),
        zoom
      })
    });

    const marcador = new Feature({
      geometry: new Point(
        olProj.fromLonLat([parseFloat(splitted[0]), parseFloat(splitted[1])]) // En dónde se va a ubicar
      )
    });

    // Agregamos icono
    marcador.setStyle(
      new Style({
        image: new Icon({
          src: '../../content/images/marcador.png'
        })
      })
    );

    // marcadores debe ser un arreglo
    const marcadores = []; // Arreglo para que se puedan agregar otros más tarde

    marcadores.push(marcador); // Agregamos el marcador al arreglo

    const capa = new Vectorlayer({
      source: new Vectorsource({
        features: marcadores // A la capa le ponemos los marcadores
      })
    });
    // Y agregamos la capa al mapa
    this.map.addLayer(capa);
  }
  Addeats(): any {
    const eatfb = this.fb.group({
      category: [],
      medida: [],
      canteat: [],
      donations: []
    });
    this.eats.push(eatfb);
  }
  Removeeats(): any {
    this.eats.removeAt(this.eats.length - 1);
  }
  filter(login: string): any {
    return this.roles.filter(x => x.user?.login === login);
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
      duration: donations.duration,
      intervalduration: donations.intervalduration,
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
    }
    for (const elemento of this.eats.controls) {
      this.subscribeToSaveResponseEat(
        this.eatService.create(
          this.createFromEat(elemento.get(['category']).value + elemento.get(['medida']).value, elemento.get(['canteat']).value, donations)
        )
      );
    }
  }
  particular(): void {
    try {
      this.filter(this.account.login)[0]?.branch?.direction;
    } catch (er) {
      this.par = false;
    }
  }
  private createFromForm(): IDonations {
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
    if (!this.lat && !this.long) {
      if (this.filter(this.account.login)[0]?.branch?.latitud && this.filter(this.account.login)[0]?.branch?.longitud) {
        this.lat = this.filter(this.account.login)[0]?.branch?.latitud;
        this.long = this.filter(this.account.login)[0]?.branch?.longitud;
      } else {
        this.lat = this.editForm.get(['latitud'])!.value;
        this.long = this.editForm.get(['longitud'])!.value;
      }
    }
    return {
      ...new Donations(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      latitud: this.lat,
      longitud: this.long,
      availabilityday: this.day,
      availabilitytime: this.hora,
      statuseat: TipoEat.Cargado,
      statusdrive: TipoDrive.Cargado,
      duration: this.statusduracion,
      intervalduration: this.intervalo,
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
