import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INutrition } from 'app/shared/model/nutrition.model';
import { NutritionService } from './nutrition.service';

@Component({
  templateUrl: './nutrition-delete-dialog.component.html'
})
export class NutritionDeleteDialogComponent {
  nutrition?: INutrition;

  constructor(protected nutritionService: NutritionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nutritionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('nutritionListModification');
      this.activeModal.close();
    });
  }
}
