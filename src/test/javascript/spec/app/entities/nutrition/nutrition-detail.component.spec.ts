import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { NutritionDetailComponent } from 'app/entities/nutrition/nutrition-detail.component';
import { Nutrition } from 'app/shared/model/nutrition.model';

describe('Component Tests', () => {
  describe('Nutrition Management Detail Component', () => {
    let comp: NutritionDetailComponent;
    let fixture: ComponentFixture<NutritionDetailComponent>;
    const route = ({ data: of({ nutrition: new Nutrition(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [NutritionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NutritionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NutritionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load nutrition on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.nutrition).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
