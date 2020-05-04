import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { DonationsComponent } from './donations.component';
import { DonationsDetailComponent } from './donations-detail.component';
import { DonationsUpdateComponent } from './donations-update.component';
import { DonationsDeleteDialogComponent } from './donations-delete-dialog.component';
import { donationsRoute } from './donations.route';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(donationsRoute)],
  declarations: [DonationsComponent, DonationsDetailComponent, DonationsUpdateComponent, DonationsDeleteDialogComponent],
  entryComponents: [DonationsDeleteDialogComponent]
})
export class SinDesperdicioDonationsModule {}
