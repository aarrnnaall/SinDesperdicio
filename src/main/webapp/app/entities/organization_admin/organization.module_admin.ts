import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { OrganizationComponent } from './organization.component_admin';
import { OrganizationDetailComponent } from './organization-detail.component_admin';
import { OrganizationUpdateComponent } from './organization-update.component_admin';
import { OrganizationDeleteDialogComponent } from './organization-delete-dialog.component_admin';
import { organizationRoute } from './organization.route_admin';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(organizationRoute)],
  declarations: [OrganizationComponent, OrganizationDetailComponent, OrganizationUpdateComponent, OrganizationDeleteDialogComponent],
  entryComponents: [OrganizationDeleteDialogComponent]
})
export class SinDesperdicioOrganizationModule {}
