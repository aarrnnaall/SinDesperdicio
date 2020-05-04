import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { NeeddonationDetailComponent } from 'app/entities/needdonation/needdonation-detail.component';
import { Needdonation } from 'app/shared/model/needdonation.model';

describe('Component Tests', () => {
  describe('Needdonation Management Detail Component', () => {
    let comp: NeeddonationDetailComponent;
    let fixture: ComponentFixture<NeeddonationDetailComponent>;
    const route = ({ data: of({ needdonation: new Needdonation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [NeeddonationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NeeddonationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NeeddonationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load needdonation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.needdonation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
