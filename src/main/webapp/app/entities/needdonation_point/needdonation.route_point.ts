import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INeeddonation, Needdonation } from 'app/shared/model/needdonation.model';
import { NeeddonationService } from './needdonation.service_point';
import { NeeddonationComponent } from './needdonation.component_point';
import { NeeddonationDetailComponent } from './needdonation-detail.component_point';
import { NeeddonationUpdateComponent } from './needdonation-update.component_point';

@Injectable({ providedIn: 'root' })
export class NeeddonationResolve implements Resolve<INeeddonation> {
  constructor(private service: NeeddonationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INeeddonation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((needdonation: HttpResponse<Needdonation>) => {
          if (needdonation.body) {
            return of(needdonation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Needdonation());
  }
}

export const needdonationRoute: Routes = [
  {
    path: '',
    component: NeeddonationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Needdonations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NeeddonationDetailComponent,
    resolve: {
      needdonation: NeeddonationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Needdonations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NeeddonationUpdateComponent,
    resolve: {
      needdonation: NeeddonationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Needdonations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NeeddonationUpdateComponent,
    resolve: {
      needdonation: NeeddonationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Needdonations'
    },
    canActivate: [UserRouteAccessService]
  }
];
