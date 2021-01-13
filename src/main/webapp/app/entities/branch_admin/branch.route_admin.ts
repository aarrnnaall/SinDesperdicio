import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBranch, Branch } from 'app/shared/model/branch.model';
import { BranchService } from './branch.service_admin';
import { BranchComponent } from './branch.component_admin';
import { BranchDetailComponent } from './branch-detail.component_admin';
import { BranchUpdateComponent } from './branch-update.component_admin';

@Injectable({ providedIn: 'root' })
export class BranchResolve implements Resolve<IBranch> {
  constructor(private service: BranchService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBranch> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((branch: HttpResponse<Branch>) => {
          if (branch.body) {
            return of(branch.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Branch());
  }
}

export const branchRoute: Routes = [
  {
    path: '',
    component: BranchComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Branches'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BranchDetailComponent,
    resolve: {
      branch: BranchResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Branches'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BranchUpdateComponent,
    resolve: {
      branch: BranchResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Branches'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BranchUpdateComponent,
    resolve: {
      branch: BranchResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Branches'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':value/add',
    component: BranchUpdateComponent,
    resolve: {
      branch: BranchResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Branch'
    },
    canActivate: [UserRouteAccessService]
  }
];
