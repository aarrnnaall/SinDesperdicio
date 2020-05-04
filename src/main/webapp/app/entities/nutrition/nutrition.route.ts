import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INutrition, Nutrition } from 'app/shared/model/nutrition.model';
import { NutritionService } from './nutrition.service';
import { NutritionComponent } from './nutrition.component';
import { NutritionDetailComponent } from './nutrition-detail.component';
import { NutritionUpdateComponent } from './nutrition-update.component';

@Injectable({ providedIn: 'root' })
export class NutritionResolve implements Resolve<INutrition> {
  constructor(private service: NutritionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INutrition> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((nutrition: HttpResponse<Nutrition>) => {
          if (nutrition.body) {
            return of(nutrition.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Nutrition());
  }
}

export const nutritionRoute: Routes = [
  {
    path: '',
    component: NutritionComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Nutritions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NutritionDetailComponent,
    resolve: {
      nutrition: NutritionResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Nutritions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NutritionUpdateComponent,
    resolve: {
      nutrition: NutritionResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Nutritions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NutritionUpdateComponent,
    resolve: {
      nutrition: NutritionResolve
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Nutritions'
    },
    canActivate: [UserRouteAccessService]
  }
];
