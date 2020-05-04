import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { NutritionUpdateComponent } from 'app/entities/nutrition/nutrition-update.component';
import { NutritionService } from 'app/entities/nutrition/nutrition.service';
import { Nutrition } from 'app/shared/model/nutrition.model';

describe('Component Tests', () => {
  describe('Nutrition Management Update Component', () => {
    let comp: NutritionUpdateComponent;
    let fixture: ComponentFixture<NutritionUpdateComponent>;
    let service: NutritionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [NutritionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NutritionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NutritionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NutritionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Nutrition(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Nutrition();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
