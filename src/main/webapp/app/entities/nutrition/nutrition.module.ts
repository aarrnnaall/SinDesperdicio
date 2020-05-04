import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SinDesperdicioSharedModule } from 'app/shared/shared.module';
import { NutritionComponent } from './nutrition.component';
import { NutritionDetailComponent } from './nutrition-detail.component';
import { NutritionUpdateComponent } from './nutrition-update.component';
import { NutritionDeleteDialogComponent } from './nutrition-delete-dialog.component';
import { nutritionRoute } from './nutrition.route';

@NgModule({
  imports: [SinDesperdicioSharedModule, RouterModule.forChild(nutritionRoute)],
  declarations: [NutritionComponent, NutritionDetailComponent, NutritionUpdateComponent, NutritionDeleteDialogComponent],
  entryComponents: [NutritionDeleteDialogComponent]
})
export class SinDesperdicioNutritionModule {}
