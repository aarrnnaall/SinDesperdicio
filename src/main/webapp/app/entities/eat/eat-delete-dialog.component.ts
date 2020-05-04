import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEat } from 'app/shared/model/eat.model';
import { EatService } from './eat.service';

@Component({
  templateUrl: './eat-delete-dialog.component.html'
})
export class EatDeleteDialogComponent {
  eat?: IEat;

  constructor(protected eatService: EatService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.eatService.delete(id).subscribe(() => {
      this.eventManager.broadcast('eatListModification');
      this.activeModal.close();
    });
  }
}
