import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEat } from 'app/shared/model/eat.model';
import { EatService } from './eat.service';
import { EatDeleteDialogComponent } from './eat-delete-dialog.component';

@Component({
  selector: 'jhi-eat',
  templateUrl: './eat.component.html'
})
export class EatComponent implements OnInit, OnDestroy {
  eats?: IEat[];
  eventSubscriber?: Subscription;

  constructor(protected eatService: EatService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.eatService.query().subscribe((res: HttpResponse<IEat[]>) => (this.eats = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEats();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
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
