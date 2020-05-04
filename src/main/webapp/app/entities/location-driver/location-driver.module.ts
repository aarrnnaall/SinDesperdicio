import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { LocationDriverComponent } from './location-driver.component';
import { LocationDriverDetailComponent } from './location-driver-detail.component';
import { LocationDriverUpdateComponent } from './location-driver-update.component';
import { LocationDriverDeleteDialogComponent } from './location-driver-delete-dialog.component';
import { locationDriverRoute } from './location-driver.route';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(locationDriverRoute)],
  declarations: [
    LocationDriverComponent,
    LocationDriverDetailComponent,
    LocationDriverUpdateComponent,
    LocationDriverDeleteDialogComponent
  ],
  entryComponents: [LocationDriverDeleteDialogComponent]
})
export class SinDesperdicioLocationDriverModule {}
