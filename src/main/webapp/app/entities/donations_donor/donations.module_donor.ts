import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { DonationsComponent } from './donations.component_donor';
import { DonationsDetailComponent } from './donations-detail.component_donor';
import { DonationsUpdateComponent } from './donations-update.component_donor';
import { DonationsDeleteDialogComponent } from './donations-delete-dialog.component_donor';
import { donationsRoute } from './donations.route_donor';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(donationsRoute)],
  declarations: [DonationsComponent, DonationsDetailComponent, DonationsUpdateComponent, DonationsDeleteDialogComponent],
  entryComponents: [DonationsDeleteDialogComponent]
})
export class SinDesperdicioDonationsModule {}
