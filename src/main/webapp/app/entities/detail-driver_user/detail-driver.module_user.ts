import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { DetailDriverComponent } from './detail-driver.component_user';
import { DetailDriverDetailComponent } from './detail-driver-detail.component_user';
import { DetailDriverUpdateComponent } from './detail-driver-update.component_user';
import { DetailDriverDeleteDialogComponent } from './detail-driver-delete-dialog.component_user';
import { detailDriverRoute } from './detail-driver.route_user';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(detailDriverRoute)],
  declarations: [DetailDriverComponent, DetailDriverDetailComponent, DetailDriverUpdateComponent, DetailDriverDeleteDialogComponent],
  entryComponents: [DetailDriverDeleteDialogComponent]
})
export class SinDesperdicioDetailDriverModule {}
