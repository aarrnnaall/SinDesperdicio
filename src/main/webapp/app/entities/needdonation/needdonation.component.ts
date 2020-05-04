import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INeeddonation } from 'app/shared/model/needdonation.model';
import { NeeddonationService } from './needdonation.service';
import { NeeddonationDeleteDialogComponent } from './needdonation-delete-dialog.component';

@Component({
  selector: 'jhi-needdonation',
  templateUrl: './needdonation.component.html'
})
export class NeeddonationComponent implements OnInit, OnDestroy {
  needdonations?: INeeddonation[];
  eventSubscriber?: Subscription;

  constructor(
    protected needdonationService: NeeddonationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.needdonationService.query().subscribe((res: HttpResponse<INeeddonation[]>) => (this.needdonations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNeeddonations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
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
