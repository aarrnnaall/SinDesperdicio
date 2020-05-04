import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SinDesperdicioTestModule } from '../../../test.module';
import { DonationsComponent } from 'app/entities/donations/donations.component';
import { DonationsService } from 'app/entities/donations/donations.service';
import { Donations } from 'app/shared/model/donations.model';

describe('Component Tests', () => {
  describe('Donations Management Component', () => {
    let comp: DonationsComponent;
    let fixture: ComponentFixture<DonationsComponent>;
    let service: DonationsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [DonationsComponent]
      })
        .overrideTemplate(DonationsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DonationsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DonationsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Donations(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.donations && comp.donations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
