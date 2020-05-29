import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.SinDesperdicioRoleModule)
      },
      {
        path: 'role_user',
        loadChildren: () => import('./role_user/role.module_user').then(m => m.SinDesperdicioRoleModule)
      },
      {
        path: 'eat',
        loadChildren: () => import('./eat/eat.module').then(m => m.SinDesperdicioEatModule)
      },
      {
        path: 'eat_donation',
        loadChildren: () => import('./eat_donation/eat.module_donation').then(m => m.SinDesperdicioEatModule)
      },
      {
        path: 'location-driver',
        loadChildren: () => import('./location-driver/location-driver.module').then(m => m.SinDesperdicioLocationDriverModule)
      },
      {
        path: 'organization',
        loadChildren: () => import('./organization/organization.module').then(m => m.SinDesperdicioOrganizationModule)
      },
      {
        path: 'branch',
        loadChildren: () => import('./branch/branch.module').then(m => m.SinDesperdicioBranchModule)
      },
      {
        path: 'detail-driver',
        loadChildren: () => import('./detail-driver/detail-driver.module').then(m => m.SinDesperdicioDetailDriverModule)
      },
      {
        path: 'detail-driver_user',
        loadChildren: () => import('./detail-driver_user/detail-driver.module_user').then(m => m.SinDesperdicioDetailDriverModule)
      },
      {
        path: 'donations',
        loadChildren: () => import('./donations/donations.module').then(m => m.SinDesperdicioDonationsModule)
      },
      {
        path: 'donations_donor',
        loadChildren: () => import('./donations_donor/donations.module_donor').then(m => m.SinDesperdicioDonationsModule)
      },
      {
        path: 'needdonation',
        loadChildren: () => import('./needdonation/needdonation.module').then(m => m.SinDesperdicioNeeddonationModule)
      },
      {
        path: 'needdonation_point',
        loadChildren: () => import('./needdonation_point/needdonation.module_point').then(m => m.SinDesperdicioNeeddonationModule)
      },
      {
        path: 'nutrition',
        loadChildren: () => import('./nutrition/nutrition.module').then(m => m.SinDesperdicioNutritionModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SinDesperdicioEntityModule {}
