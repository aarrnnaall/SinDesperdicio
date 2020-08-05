import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { UserManagementComponent } from './user-management.component_org';
import { UserManagementDetailComponent } from './user-management-detail.component_org';
import { UserManagementUpdateComponent } from './user-management-update.component_org';
import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component_org';
import { userManagementRoute } from './user-management.route_org';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(userManagementRoute)],
  declarations: [
    UserManagementComponent,
    UserManagementDetailComponent,
    UserManagementUpdateComponent,
    UserManagementDeleteDialogComponent
  ],
  entryComponents: [UserManagementDeleteDialogComponent]
})
export class UserManagementModule {}
