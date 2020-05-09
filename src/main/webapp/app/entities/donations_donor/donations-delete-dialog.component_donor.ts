import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDonations } from 'app/shared/model/donations.model';
import { DonationsService } from './donations.service_donor';

@Component({
  templateUrl: './donations-delete-dialog.component_donor.html'
})
export class DonationsDeleteDialogComponent {
  donations?: IDonations;

  constructor(protected donationsService: DonationsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.donationsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('donationsListModification');
      this.activeModal.close();
    });
  }
}
