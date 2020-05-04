import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { INutrition, Nutrition } from 'app/shared/model/nutrition.model';
import { NutritionService } from './nutrition.service';
import { IDonations } from 'app/shared/model/donations.model';
import { DonationsService } from 'app/entities/donations/donations.service';

@Component({
  selector: 'jhi-nutrition-update',
  templateUrl: './nutrition-update.component.html'
})
export class NutritionUpdateComponent implements OnInit {
  isSaving = false;
  donations: IDonations[] = [];

  editForm = this.fb.group({
    id: [],
    description: [],
    water: [],
    calorie: [],
    protein: [],
    lipidTot: [],
    ash: [],
    carbohydrt: [],
    fiber: [],
    sugarTot: [],
    calcium: [],
    iron: [],
    magnesium: [],
    phosphorus: [],
    potassium: [],
    sodium: [],
    zinc: [],
    manganese: [],
    vitC: [],
    thiamin: [],
    riboflavin: [],
    niacin: [],
    pantoAcid: [],
    vitB6: [],
    folateTot: [],
    folicAcid: [],
    foodFolate: [],
    folateDFE: [],
    vholineTot: [],
    vitB12: [],
    vitAIU: [],
    vitARAE: [],
    vitE: [],
    vitD: [],
    vitK: [],
    donation: []
  });

  constructor(
    protected nutritionService: NutritionService,
    protected donationsService: DonationsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nutrition }) => {
      this.updateForm(nutrition);

      this.donationsService
        .query({ filter: 'nutrition-is-null' })
        .pipe(
          map((res: HttpResponse<IDonations[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDonations[]) => {
          if (!nutrition.donation || !nutrition.donation.id) {
            this.donations = resBody;
          } else {
            this.donationsService
              .find(nutrition.donation.id)
              .pipe(
                map((subRes: HttpResponse<IDonations>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDonations[]) => (this.donations = concatRes));
          }
        });
    });
  }

  updateForm(nutrition: INutrition): void {
    this.editForm.patchValue({
      id: nutrition.id,
      description: nutrition.description,
      water: nutrition.water,
      calorie: nutrition.calorie,
      protein: nutrition.protein,
      lipidTot: nutrition.lipidTot,
      ash: nutrition.ash,
      carbohydrt: nutrition.carbohydrt,
      fiber: nutrition.fiber,
      sugarTot: nutrition.sugarTot,
      calcium: nutrition.calcium,
      iron: nutrition.iron,
      magnesium: nutrition.magnesium,
      phosphorus: nutrition.phosphorus,
      potassium: nutrition.potassium,
      sodium: nutrition.sodium,
      zinc: nutrition.zinc,
      manganese: nutrition.manganese,
      vitC: nutrition.vitC,
      thiamin: nutrition.thiamin,
      riboflavin: nutrition.riboflavin,
      niacin: nutrition.niacin,
      pantoAcid: nutrition.pantoAcid,
      vitB6: nutrition.vitB6,
      folateTot: nutrition.folateTot,
      folicAcid: nutrition.folicAcid,
      foodFolate: nutrition.foodFolate,
      folateDFE: nutrition.folateDFE,
      vholineTot: nutrition.vholineTot,
      vitB12: nutrition.vitB12,
      vitAIU: nutrition.vitAIU,
      vitARAE: nutrition.vitARAE,
      vitE: nutrition.vitE,
      vitD: nutrition.vitD,
      vitK: nutrition.vitK,
      donation: nutrition.donation
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nutrition = this.createFromForm();
    if (nutrition.id !== undefined) {
      this.subscribeToSaveResponse(this.nutritionService.update(nutrition));
    } else {
      this.subscribeToSaveResponse(this.nutritionService.create(nutrition));
    }
  }

  private createFromForm(): INutrition {
    return {
      ...new Nutrition(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      water: this.editForm.get(['water'])!.value,
      calorie: this.editForm.get(['calorie'])!.value,
      protein: this.editForm.get(['protein'])!.value,
      lipidTot: this.editForm.get(['lipidTot'])!.value,
      ash: this.editForm.get(['ash'])!.value,
      carbohydrt: this.editForm.get(['carbohydrt'])!.value,
      fiber: this.editForm.get(['fiber'])!.value,
      sugarTot: this.editForm.get(['sugarTot'])!.value,
      calcium: this.editForm.get(['calcium'])!.value,
      iron: this.editForm.get(['iron'])!.value,
      magnesium: this.editForm.get(['magnesium'])!.value,
      phosphorus: this.editForm.get(['phosphorus'])!.value,
      potassium: this.editForm.get(['potassium'])!.value,
      sodium: this.editForm.get(['sodium'])!.value,
      zinc: this.editForm.get(['zinc'])!.value,
      manganese: this.editForm.get(['manganese'])!.value,
      vitC: this.editForm.get(['vitC'])!.value,
      thiamin: this.editForm.get(['thiamin'])!.value,
      riboflavin: this.editForm.get(['riboflavin'])!.value,
      niacin: this.editForm.get(['niacin'])!.value,
      pantoAcid: this.editForm.get(['pantoAcid'])!.value,
      vitB6: this.editForm.get(['vitB6'])!.value,
      folateTot: this.editForm.get(['folateTot'])!.value,
      folicAcid: this.editForm.get(['folicAcid'])!.value,
      foodFolate: this.editForm.get(['foodFolate'])!.value,
      folateDFE: this.editForm.get(['folateDFE'])!.value,
      vholineTot: this.editForm.get(['vholineTot'])!.value,
      vitB12: this.editForm.get(['vitB12'])!.value,
      vitAIU: this.editForm.get(['vitAIU'])!.value,
      vitARAE: this.editForm.get(['vitARAE'])!.value,
      vitE: this.editForm.get(['vitE'])!.value,
      vitD: this.editForm.get(['vitD'])!.value,
      vitK: this.editForm.get(['vitK'])!.value,
      donation: this.editForm.get(['donation'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INutrition>>): void {
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
