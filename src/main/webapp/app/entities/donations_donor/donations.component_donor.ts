import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';
import { IDonations } from 'app/shared/model/donations.model';
import { DonationsService } from './donations.service_donor';
import { DonationsDeleteDialogComponent } from './donations-delete-dialog.component_donor';

@Component({
  selector: 'jhi-donations',
  templateUrl: './donations.component_donor.html'
})
export class DonationsComponent implements OnInit, OnDestroy {
  donations?: IDonations[];
  eventSubscriber?: Subscription;
  account: any;
  authSubscription?: Subscription;

  constructor(protected donationsService: DonationsService, private accountService: AccountService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.donationsService.query().subscribe((res: HttpResponse<IDonations[]>) => (this.donations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDonations();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));

  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
  filter(): any{
    return this.donations?.filter(x=>x.donor?.user?.login===this.account.login);
  }
  trackId(index: number, item: IDonations): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDonations(): void {
    this.eventSubscriber = this.eventManager.subscribe('donationsListModification', () => this.loadAll());
  }

  delete(donations: IDonations): void {
    const modalRef = this.modalService.open(DonationsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.donations = donations;
  }
}
