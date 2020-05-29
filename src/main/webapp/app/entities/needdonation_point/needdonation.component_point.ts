import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';
import { INeeddonation } from 'app/shared/model/needdonation.model';
import { NeeddonationService } from './needdonation.service_point';
import { NeeddonationDeleteDialogComponent } from './needdonation-delete-dialog.component_point';

@Component({
  selector: 'jhi-needdonation',
  templateUrl: './needdonation.component_point.html'
})
export class NeeddonationComponent implements OnInit, OnDestroy {
  needdonations?: INeeddonation[];
  eventSubscriber?: Subscription;
  authSubscription?: Subscription;
  account: any;
  constructor(
    protected needdonationService: NeeddonationService,
    private accountService: AccountService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.needdonationService.query().subscribe((res: HttpResponse<INeeddonation[]>) => (this.needdonations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNeeddonations();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
  filter(): any {
    return this.needdonations?.filter(x => x.point?.user?.login === this.account.login);
  }
  trackId(index: number, item: INeeddonation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNeeddonations(): void {
    this.eventSubscriber = this.eventManager.subscribe('needdonationListModification', () => this.loadAll());
  }

  delete(needdonation: INeeddonation): void {
    const modalRef = this.modalService.open(NeeddonationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.needdonation = needdonation;
  }
}
