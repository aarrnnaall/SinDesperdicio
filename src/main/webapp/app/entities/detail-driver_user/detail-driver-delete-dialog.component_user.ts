import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetailDriver } from 'app/shared/model/detail-driver.model';
import { DetailDriverService } from './detail-driver.service_user';

@Component({
  templateUrl: './detail-driver-delete-dialog.component_user.html'
})
export class DetailDriverDeleteDialogComponent {
  detailDriver?: IDetailDriver;

  constructor(
    protected detailDriverService: DetailDriverService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detailDriverService.delete(id).subscribe(() => {
      this.eventManager.broadcast('detailDriverListModification');
      this.activeModal.close();
    });
  }
}
