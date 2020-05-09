import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDonations, Donations } from 'app/shared/model/donations.model';
import { DonationsService } from './donations.service_donor';
import { DonationsComponent } from './donations.component_donor';
import { DonationsDetailComponent } from './donations-detail.component_donor';
import { DonationsUpdateComponent } from './donations-update.component_donor';
import { userManagementRoute } from '../../admin/user-management/user-management.route';
import { User } from '../../core/user/user.model';

@Injectable({ providedIn: 'root' })
export class DonationsResolve implements Resolve<IDonations> {
  constructor(private service: DonationsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDonations> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((donations: HttpResponse<Donations>) => {
          if (donations.body) {
            return of(donations.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Donations());
  }
}

export const donationsRoute: Routes = [
  {
    path: '',
    component: DonationsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Donations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DonationsDetailComponent,
    resolve: {
      donations: DonationsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Donations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DonationsUpdateComponent,
    resolve: {
      donations: DonationsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Donations'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DonationsUpdateComponent,
    resolve: {
      donations: DonationsResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Donations'
    },
    canActivate: [UserRouteAccessService]
  }
];
