import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { EatComponent } from './eat.component_donation';
import { EatDetailComponent } from './eat-detail.component_donation';
import { EatUpdateComponent } from './eat-update.component_donation';
import { EatDeleteDialogComponent } from './eat-delete-dialog.component_donation';
import { eatRoute } from './eat.route_donation';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(eatRoute)],
  declarations: [EatComponent, EatDetailComponent, EatUpdateComponent, EatDeleteDialogComponent],
  entryComponents: [EatDeleteDialogComponent]
})
export class SinDesperdicioEatModule {}
