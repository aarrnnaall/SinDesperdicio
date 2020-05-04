import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { DetailDriverDetailComponent } from 'app/entities/detail-driver/detail-driver-detail.component';
import { DetailDriver } from 'app/shared/model/detail-driver.model';

describe('Component Tests', () => {
  describe('DetailDriver Management Detail Component', () => {
    let comp: DetailDriverDetailComponent;
    let fixture: ComponentFixture<DetailDriverDetailComponent>;
    const route = ({ data: of({ detailDriver: new DetailDriver(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [DetailDriverDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DetailDriverDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DetailDriverDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load detailDriver on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.detailDriver).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
