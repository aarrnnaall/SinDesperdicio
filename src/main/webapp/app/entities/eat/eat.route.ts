import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEat, Eat } from 'app/shared/model/eat.model';
import { EatService } from './eat.service';
import { EatComponent } from './eat.component';
import { EatDetailComponent } from './eat-detail.component';
import { EatUpdateComponent } from './eat-update.component';

@Injectable({ providedIn: 'root' })
export class EatResolve implements Resolve<IEat> {
  constructor(private service: EatService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEat> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((eat: HttpResponse<Eat>) => {
          if (eat.body) {
            return of(eat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Eat());
  }
}

export const eatRoute: Routes = [
  {
    path: '',
    component: EatComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Eats'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EatDetailComponent,
    resolve: {
      eat: EatResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Eats'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EatUpdateComponent,
    resolve: {
      eat: EatResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Eats'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EatUpdateComponent,
    resolve: {
      eat: EatResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Eats'
    },
    canActivate: [UserRouteAccessService]
  }
];
