import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';
import { IEat } from 'app/shared/model/eat.model';
import { EatService } from './eat.service_donation';
import { EatDeleteDialogComponent } from './eat-delete-dialog.component_donation';

@Component({
  selector: 'jhi-eat',
  templateUrl: './eat.component_donation.html'
})
export class EatComponent implements OnInit, OnDestroy {
  eats?: IEat[];
  account: any;
  eventSubscriber?: Subscription;
  authSubscription?: Subscription;
  constructor(
    private accountService: AccountService,
    protected eatService: EatService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.eatService.query().subscribe((res: HttpResponse<IEat[]>) => (this.eats = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEats();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }
  filter(): any {
    return this.eats?.filter(x => x.donations?.donor?.user?.login === this.account.login);
  }
  trackId(index: number, item: IEat): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEats(): void {
    this.eventSubscriber = this.eventManager.subscribe('eatListModification', () => this.loadAll());
  }

  delete(eat: IEat): void {
    const modalRef = this.modalService.open(EatDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.eat = eat;
  }
}
