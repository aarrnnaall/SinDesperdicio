import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SinDesperdicioTestModule } from '../../../test.module';
import { NeeddonationComponent } from 'app/entities/needdonation/needdonation.component';
import { NeeddonationService } from 'app/entities/needdonation/needdonation.service';
import { Needdonation } from 'app/shared/model/needdonation.model';

describe('Component Tests', () => {
  describe('Needdonation Management Component', () => {
    let comp: NeeddonationComponent;
    let fixture: ComponentFixture<NeeddonationComponent>;
    let service: NeeddonationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [NeeddonationComponent]
      })
        .overrideTemplate(NeeddonationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NeeddonationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NeeddonationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Needdonation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.needdonations && comp.needdonations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
