import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';
import { IDetailDriver } from 'app/shared/model/detail-driver.model';
import { DetailDriverService } from './detail-driver.service_user';
import { DetailDriverDeleteDialogComponent } from './detail-driver-delete-dialog.component_user';

@Component({
  selector: 'jhi-detail-driver',
  templateUrl: './detail-driver.component_user.html'
})
export class DetailDriverComponent implements OnInit, OnDestroy {
  detailDrivers?: IDetailDriver[];
  eventSubscriber?: Subscription;
  authSubscription?: Subscription;
  account: any;
  constructor(
    protected detailDriverService: DetailDriverService,
    protected eventManager: JhiEventManager,
    private accountService: AccountService,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.detailDriverService.query().subscribe((res: HttpResponse<IDetailDriver[]>) => (this.detailDrivers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDetailDrivers();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
  filter(): any {
    return this.detailDrivers?.filter(x => x.drive?.user?.login === this.account.login);
  }
  trackId(index: number, item: IDetailDriver): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDetailDrivers(): void {
    this.eventSubscriber = this.eventManager.subscribe('detailDriverListModification', () => this.loadAll());
  }

  delete(detailDriver: IDetailDriver): void {
    const modalRef = this.modalService.open(DetailDriverDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detailDriver = detailDriver;
  }
}
