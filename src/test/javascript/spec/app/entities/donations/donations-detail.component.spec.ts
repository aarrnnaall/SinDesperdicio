import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { DonationsDetailComponent } from 'app/entities/donations/donations-detail.component';
import { Donations } from 'app/shared/model/donations.model';

describe('Component Tests', () => {
  describe('Donations Management Detail Component', () => {
    let comp: DonationsDetailComponent;
    let fixture: ComponentFixture<DonationsDetailComponent>;
    const route = ({ data: of({ donations: new Donations(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [DonationsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DonationsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DonationsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load donations on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.donations).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
