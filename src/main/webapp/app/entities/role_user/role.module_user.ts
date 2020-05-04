import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { RoleComponent } from './role.component_user';
import { RoleDetailComponent } from './role-detail.component_user';
import { RoleUpdateComponent } from './role-update.component_user';
import { RoleDeleteDialogComponent } from './role-delete-dialog.component_user';
import { roleRoute } from './role.route_user';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(roleRoute)],
  declarations: [RoleComponent, RoleDetailComponent, RoleUpdateComponent, RoleDeleteDialogComponent],
  entryComponents: [RoleDeleteDialogComponent]
})
export class SinDesperdicioRoleModule {}
