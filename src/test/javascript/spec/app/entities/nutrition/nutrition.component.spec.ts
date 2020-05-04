import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SinDesperdicioTestModule } from '../../../test.module';
import { NutritionComponent } from 'app/entities/nutrition/nutrition.component';
import { NutritionService } from 'app/entities/nutrition/nutrition.service';
import { Nutrition } from 'app/shared/model/nutrition.model';

describe('Component Tests', () => {
  describe('Nutrition Management Component', () => {
    let comp: NutritionComponent;
    let fixture: ComponentFixture<NutritionComponent>;
    let service: NutritionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [NutritionComponent]
      })
        .overrideTemplate(NutritionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NutritionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NutritionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Nutrition(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.nutritions && comp.nutritions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
