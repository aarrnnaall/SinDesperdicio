import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { NeeddonationComponent } from './needdonation.component_point';
import { NeeddonationDetailComponent } from './needdonation-detail.component_point';
import { NeeddonationUpdateComponent } from './needdonation-update.component_point';
import { NeeddonationDeleteDialogComponent } from './needdonation-delete-dialog.component_point';
import { needdonationRoute } from './needdonation.route_point';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(needdonationRoute)],
  declarations: [NeeddonationComponent, NeeddonationDetailComponent, NeeddonationUpdateComponent, NeeddonationDeleteDialogComponent],
  entryComponents: [NeeddonationDeleteDialogComponent]
})
export class SinDesperdicioNeeddonationModule {}
