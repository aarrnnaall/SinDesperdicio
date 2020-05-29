import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INeeddonation } from 'app/shared/model/needdonation.model';
import { NeeddonationService } from './needdonation.service_point';

@Component({
  templateUrl: './needdonation-delete-dialog.component_point.html'
})
export class NeeddonationDeleteDialogComponent {
  needdonation?: INeeddonation;

  constructor(
    protected needdonationService: NeeddonationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.needdonationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('needdonationListModification');
      this.activeModal.close();
    });
  }
}
