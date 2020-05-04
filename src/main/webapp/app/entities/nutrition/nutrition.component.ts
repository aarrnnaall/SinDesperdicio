import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INutrition } from 'app/shared/model/nutrition.model';
import { NutritionService } from './nutrition.service';
import { NutritionDeleteDialogComponent } from './nutrition-delete-dialog.component';

@Component({
  selector: 'jhi-nutrition',
  templateUrl: './nutrition.component.html'
})
export class NutritionComponent implements OnInit, OnDestroy {
  nutritions?: INutrition[];
  eventSubscriber?: Subscription;

  constructor(protected nutritionService: NutritionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.nutritionService.query().subscribe((res: HttpResponse<INutrition[]>) => (this.nutritions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNutritions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INutrition): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNutritions(): void {
    this.eventSubscriber = this.eventManager.subscribe('nutritionListModification', () => this.loadAll());
  }

  delete(nutrition: INutrition): void {
    const modalRef = this.modalService.open(NutritionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.nutrition = nutrition;
  }
}
