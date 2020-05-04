import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBranch } from 'app/shared/model/branch.model';
import { BranchService } from './branch.service';
import { BranchDeleteDialogComponent } from './branch-delete-dialog.component';

@Component({
  selector: 'jhi-branch',
  templateUrl: './branch.component.html'
})
export class BranchComponent implements OnInit, OnDestroy {
  branches?: IBranch[];
  eventSubscriber?: Subscription;

  constructor(protected branchService: BranchService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.branchService.query().subscribe((res: HttpResponse<IBranch[]>) => (this.branches = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBranches();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBranch): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBranches(): void {
    this.eventSubscriber = this.eventManager.subscribe('branchListModification', () => this.loadAll());
  }

  delete(branch: IBranch): void {
    const modalRef = this.modalService.open(BranchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.branch = branch;
  }
}
