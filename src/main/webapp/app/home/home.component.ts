import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoleService } from '../entities/role_user/role.service_user';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { HttpResponse } from '@angular/common/http';
import { IRole } from 'app/shared/model/role.model';
import { JhiEventManager } from 'ng-jhipster';

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

import TileLayer from 'ol/layer/Tile';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: any;
  lat: any;
  lng: any;
  map: any;
  authSubscription?: Subscription;
  roles?: IRole[];
  eventSubscriber?: Subscription;
  constructor(
    private accountService: AccountService,
    protected roleService: RoleService,
    private loginModalService: LoginModalService,
    protected eventManager: JhiEventManager
  ) {}
  loadAllrole(): void {
    this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));
  }
  registerChangeInRoles(): void {
    this.eventSubscriber = this.eventManager.subscribe('roleListModification', () => this.loadAllrole());
  }
  ngOnInit(): void {
    this.getUserLocation();
    this.loadAllrole();
    this.registerChangeInRoles();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  maps(log: number, lat: number, zoom: number): any {
    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([log, lat]),
        zoom
      })
    });

    const marcador = new Feature({
      geometry: new Point(
        olProj.fromLonLat([log, lat]) // En dónde se va a ubicar
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
  filter(): any {
    return this.roles?.filter(x => x.user?.login === this.account.login);
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.maps(this.lng, this.lat, 18);
      });
    }
  }
}
