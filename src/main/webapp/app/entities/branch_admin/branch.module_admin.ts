import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { BranchComponent } from './branch.component_admin';
import { BranchDetailComponent } from './branch-detail.component_admin';
import { BranchUpdateComponent } from './branch-update.component_admin';
import { BranchDeleteDialogComponent } from './branch-delete-dialog.component_admin';
import { branchRoute } from './branch.route_admin';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(branchRoute)],
  declarations: [BranchComponent, BranchDetailComponent, BranchUpdateComponent, BranchDeleteDialogComponent],
  entryComponents: [BranchDeleteDialogComponent]
})
export class SinDesperdicioBranchModule {}
