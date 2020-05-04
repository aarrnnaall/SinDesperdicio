import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { NeeddonationComponent } from './needdonation.component';
import { NeeddonationDetailComponent } from './needdonation-detail.component';
import { NeeddonationUpdateComponent } from './needdonation-update.component';
import { NeeddonationDeleteDialogComponent } from './needdonation-delete-dialog.component';
import { needdonationRoute } from './needdonation.route';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(needdonationRoute)],
  declarations: [NeeddonationComponent, NeeddonationDetailComponent, NeeddonationUpdateComponent, NeeddonationDeleteDialogComponent],
  entryComponents: [NeeddonationDeleteDialogComponent]
})
export class SinDesperdicioNeeddonationModule {}
