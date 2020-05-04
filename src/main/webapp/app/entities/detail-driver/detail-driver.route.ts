import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDetailDriver, DetailDriver } from 'app/shared/model/detail-driver.model';
import { DetailDriverService } from './detail-driver.service';
import { DetailDriverComponent } from './detail-driver.component';
import { DetailDriverDetailComponent } from './detail-driver-detail.component';
import { DetailDriverUpdateComponent } from './detail-driver-update.component';

@Injectable({ providedIn: 'root' })
export class DetailDriverResolve implements Resolve<IDetailDriver> {
  constructor(private service: DetailDriverService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetailDriver> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((detailDriver: HttpResponse<DetailDriver>) => {
          if (detailDriver.body) {
            return of(detailDriver.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DetailDriver());
  }
}

export const detailDriverRoute: Routes = [
  {
    path: '',
    component: DetailDriverComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'DetailDrivers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetailDriverDetailComponent,
    resolve: {
      detailDriver: DetailDriverResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'DetailDrivers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetailDriverUpdateComponent,
    resolve: {
      detailDriver: DetailDriverResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'DetailDrivers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetailDriverUpdateComponent,
    resolve: {
      detailDriver: DetailDriverResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'DetailDrivers'
    },
    canActivate: [UserRouteAccessService]
  }
];
