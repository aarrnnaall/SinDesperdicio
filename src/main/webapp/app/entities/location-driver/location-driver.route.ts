import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILocationDriver, LocationDriver } from 'app/shared/model/location-driver.model';
import { LocationDriverService } from './location-driver.service';
import { LocationDriverComponent } from './location-driver.component';
import { LocationDriverDetailComponent } from './location-driver-detail.component';
import { LocationDriverUpdateComponent } from './location-driver-update.component';

@Injectable({ providedIn: 'root' })
export class LocationDriverResolve implements Resolve<ILocationDriver> {
  constructor(private service: LocationDriverService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocationDriver> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((locationDriver: HttpResponse<LocationDriver>) => {
          if (locationDriver.body) {
            return of(locationDriver.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocationDriver());
  }
}

export const locationDriverRoute: Routes = [
  {
    path: '',
    component: LocationDriverComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'LocationDrivers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LocationDriverDetailComponent,
    resolve: {
      locationDriver: LocationDriverResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'LocationDrivers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LocationDriverUpdateComponent,
    resolve: {
      locationDriver: LocationDriverResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'LocationDrivers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LocationDriverUpdateComponent,
    resolve: {
      locationDriver: LocationDriverResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'LocationDrivers'
    },
    canActivate: [UserRouteAccessService]
  }
];
