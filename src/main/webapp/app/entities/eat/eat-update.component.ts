import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEat, Eat } from 'app/shared/model/eat.model';
import { EatService } from './eat.service';
import { IDonations } from 'app/shared/model/donations.model';
import { DonationsService } from 'app/entities/donations/donations.service';

@Component({
  selector: 'jhi-eat-update',
  templateUrl: './eat-update.component.html'
})
export class EatUpdateComponent implements OnInit {
  isSaving = false;
  donations: IDonations[] = [];

  editForm = this.fb.group({
    id: [],
    category: [],
    canteat: [],
    donations: []
  });

  constructor(
    protected eatService: EatService,
    protected donationsService: DonationsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eat }) => {
      this.updateForm(eat);

      this.donationsService.query().subscribe((res: HttpResponse<IDonations[]>) => (this.donations = res.body || []));
    });
  }

  updateForm(eat: IEat): void {
    this.editForm.patchValue({
      id: eat.id,
      category: eat.category,
      canteat: eat.canteat,
      donations: eat.donations
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const eat = this.createFromForm();
    if (eat.id !== undefined) {
      this.subscribeToSaveResponse(this.eatService.update(eat));
    } else {
      this.subscribeToSaveResponse(this.eatService.create(eat));
    }
  }

  private createFromForm(): IEat {
    return {
      ...new Eat(),
      id: this.editForm.get(['id'])!.value,
      category: this.editForm.get(['category'])!.value,
      canteat: this.editForm.get(['canteat'])!.value,
      donations: this.editForm.get(['donations'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEat>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDonations): any {
    return item.id;
  }
}
