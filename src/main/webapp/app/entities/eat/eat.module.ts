import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { EatComponent } from './eat.component';
import { EatDetailComponent } from './eat-detail.component';
import { EatUpdateComponent } from './eat-update.component';
import { EatDeleteDialogComponent } from './eat-delete-dialog.component';
import { eatRoute } from './eat.route';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(eatRoute)],
  declarations: [EatComponent, EatDetailComponent, EatUpdateComponent, EatDeleteDialogComponent],
  entryComponents: [EatDeleteDialogComponent]
})
export class SinDesperdicioEatModule {}
