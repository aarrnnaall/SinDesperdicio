import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { EatDetailComponent } from 'app/entities/eat/eat-detail.component';
import { Eat } from 'app/shared/model/eat.model';

describe('Component Tests', () => {
  describe('Eat Management Detail Component', () => {
    let comp: EatDetailComponent;
    let fixture: ComponentFixture<EatDetailComponent>;
    const route = ({ data: of({ eat: new Eat(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [EatDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EatDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EatDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load eat on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.eat).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
